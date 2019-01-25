var uploaderImg = null;
var uploaderVideo = null;
var uploaderSingleImg = null;
var uploaderFileList = new Array();
var uploaderFileListCount = 0;
var uploaderPhoto = null;
///绑定上传控件（图片，文档，视频）
var BindUploader = function (mt, guid) {
    BindUploaderImg(mt);
    if (guid != undefined && guid != null) {
        BindUploaderVideo(mt, guid);
    }
}

///上传图片
var BindUploaderImg = function (mt) {
    var et = 1;
    uploaderImg = WebUploader.create({
        auto: true,
        swf: './webuploader/Uploader.swf',
        server: '/File/UploadFile',
        pick: { id: '#btnImg', multiple: false },
        formData: { "et": et, "mt": mt },
        resize: false,
        accept: {                     // 指定接受哪些类型的文件
            title: 'Images',
            extensions: 'jpg,jpeg,png,gif,bmp',
            mimeTypes: 'image/*'
        },
        fileSingleSizeLimit: 10 * 1024 * 1024,       //验证单个文件大小是否超出限制

        duplicate: true               //去重
    });
    BindUploaderEvent(uploaderImg, et);
}
///上传视频
var BindUploaderVideo = function (mt, guid) {
    var et = 2;
    uploaderVideo = WebUploader.create({
        auto: true,
        swf: './webuploader/Uploader.swf',
        server: '/upload/production/file',
        pick: { id: '#btnVideo', multiple: false },
        resize: false,
        formData: { "mt": mt, "guid": guid },
        accept: {                     // 指定接受哪些类型的文件
            title: 'Video',
            extensions: 'mp4,mov',
            mimeTypes: 'video/mp4,video/quicktime'
        },
        fileSingleSizeLimit: 30 * 1024 * 1024,       //验证单个文件大小是否超出限制
        duplicate: true,               //去重
        chunked: true,
        chunkSize: 2 * 1024 * 1024,
        prepareNextFile: true
    });

    BindUploaderEvent(uploaderVideo, et);
    uploaderVideo.on('uploadSuccess', function (file, response) {
        if (response.Success == true) {//上传成功！
            $.post("/File/MergeUploadFile", { "d": new Date(), "fileName": file.name, "guid": guid, "mt": mt }, function (result) {
                webUploaderSuccess(result, et);
            })
        }
        else {
            $.toast(response.Msg);
        }
    });
}
var BindUploaderEvent = function (obj, et) {
    obj.on('uploadProgress', webUploaderProgress);
    if (et != 2) {
        obj.on('uploadSuccess', function (file, response) {
            webUploaderSuccess(response, et);
        });
    }
    obj.on('error', function (e) {
        uploaderObjError(e, et);
    });
    obj.on("fileQueued", webUploaderFileQueued);
    obj.on('uploadError', webUploaderError);
    obj.on('uploadComplete', webUploaderComplete);
    obj.on('beforeFileQueued', webUploaderBeforeFileQueued);
}

//移除附件（页面上的）
var RemoveFile = function (obj, flPath) {
    $(obj).parent().parent().remove();
    for (var i = 0; i < uploaderFileList.length; i++) {
        if (uploaderFileList[i]["FilePath"] == flPath) {
            uploaderFileList.splice(i, 1);
            break;
        }
    }
}

///文件添加到队列
var webUploaderFileQueued = function (file) {
    uploaderFileListCount++;
}
///文件添加到队列之前的判断
var webUploaderBeforeFileQueued = function (file) {
    var isMore = uploaderFileListCount + $("#ulFileList").children().length >= 9;
    if (isMore) {
        this.trigger('error', 'Q_EXCEED_NUM_LIMIT', 9, file);
    }
    return !isMore;
}
//文件上传失败
var webUploaderError = function (file) {
    $.removeLoading();
}
///文件上传进度事件
var webUploaderProgress = function (file, percentage) {
    $.loading("正在上传，请等待");
}

///文件上传成功事件
var webUploaderSuccess = function (response, et) {
    if (response.Success == true) {//上传成功！
        uploaderFileListCount = 0;
        var fileCount = $("#ulFileList").children().length;
        if (fileCount >= 9) {
            $.toast("最多只能上传9个附件");
        }
        else {
            uploaderFileList[uploaderFileList.length] = response;
            var strPlanFile = "<li><img class='pimg' path='" + response["FilePrevPath"] + "' src='" + response["FileThPath"] + "' onclick=\"PreviewPlanImg(this,'" + response["FilePath"] + "')\"/><i><img src='/Content/images/del_icon.png' onclick=\"RemoveFile(this,'" + response["FilePath"] + "')\"/></i></li>";
            $("#ulFileList").append(strPlanFile);
        }
    }
    else {
        $.toast(response.Msg);
    }
}
///文件上传完成事件
var webUploaderComplete = function (file) {
    $.removeLoading();
}
///上传控件错误（1：图片，0：文档，2：视频）
var uploaderObjError = function (e, flType) {
    var errorMessage = "";
    if (e == "F_EXCEED_SIZE" || e == "Q_EXCEED_SIZE_LIMIT") {
        if (flType == 1) {
            errorMessage = "所选文件大小超过限制(10MB)";
        }
        else if (flType == 2) {
            errorMessage = "所选文件大小超过限制(30M)";
        }
    }
    else if (e == "Q_TYPE_DENIED") {
        if (flType == 1) {
            errorMessage = "只能上传jpg,jpeg,png,gif,bmp格式的图片";
        }
        else if (flType == 2) {
            errorMessage = "只能上传Mp4、mov格式的视频文件";
        }
    }
    else if (e == "Q_EXCEED_NUM_LIMIT") {
        errorMessage = "最多只能上传9个附件";
    }
    if (errorMessage != "") {
        $.toast(errorMessage)
    }
}

///上传单一图片（上传头像，海报等）
var BindUploaderPhoto = function (mt, fucEvent, serverUrl, Id) {
    var serUrl = "/upload/production/file";
    var pickId = "#btnUploaderPhoto";
    if (!$.IsNullOrEmpty(Id)) {
        pickId = "#" + Id;
    }
    if (!$.IsNullOrEmpty(serverUrl)) {
        serUrl = serverUrl;
    }
    uploaderPhoto = WebUploader.create({
        auto: true,
        swf: './webuploader/Uploader.swf',
        server: serUrl,
        pick: {
            id: pickId, multiple: false
        },
        formData: { "et": 1, "mt": mt },
        resize: false,
        accept: {                     // 指定接受哪些类型的文件
            title: 'Images',
            extensions: 'jpg,jpeg,png,gif,bmp',
            mimeTypes: 'image/*'
        },
        fileSingleSizeLimit: 10 * 1024 * 1024,       //验证单个文件大小是否超出限制
        multiple: false,
        duplicate: true               //去重
    });
    uploaderPhoto.on('uploadProgress', webUploaderProgress);
    uploaderPhoto.on('uploadSuccess', function (file, response) {
        if (Id != undefined) {
            fucEvent(Id, response)
        }
        else {
            fucEvent(response);
        }
        $.removeLoading();
    });
    uploaderPhoto.on('uploadError', webUploaderError);
    uploaderPhoto.on('uploadComplete', webUploaderComplete);
    uploaderPhoto.on('error', function (e) {
        uploaderObjError(e, 1);
    });
}


///上传裁剪图片
var BindUploaderCrop = function (mt, cropable, ratio, fucEvent, serverUrl, Id) {
    var serUrl = "/File/UploadFile";
    var pickId = "#btnUploaderPhoto";
    if (!$.IsNullOrEmpty(Id)) {
        pickId = "#" + Id;
    }
    if (!$.IsNullOrEmpty(serverUrl)) {
        serUrl = serverUrl;
    }
    var et = 1;
    uploaderImg = WebUploader.create({
        auto: !cropable,
        swf: '/Scripts/webuploader-0.1.5/Uploader.swf',
        server: serUrl,
        pick: { id: pickId, multiple: false },
        formData: { "et": et, "mt": mt },
        resize: false,
        accept: {                     // 指定接受哪些类型的文件
            title: 'Images',
            extensions: 'jpg,jpeg,png,gif,bmp',
            mimeTypes: 'image/*'
        },
        fileSingleSizeLimit: 10 * 1024 * 1024,       //验证单个文件大小是否超出限制
        duplicate: true               //去重
    });
    if (cropable) {
        CropperImg(ratio);
    }
    uploaderImg.on('uploadProgress', webUploaderProgress);
    uploaderImg.on('uploadError', webUploaderError);
    uploaderImg.on('uploadComplete', webUploaderComplete);
    uploaderImg.on('uploadSuccess', function (file, response) {
        fucEvent(response);
        $('.upload-img > img').attr("src", "");
        $.removeLoading();
        //$('#cropTab').hide();
    });
    uploaderImg.on('error', function (e) {
        uploaderObjError(e, 1);
    });
    if (cropable) {
        uploaderImg.on("fileQueued", function (file) {
            //本地直接读取图片文件
            //var upfile = file.source.source;

            //$('#cropTab').show();
            $('#coverImg_mask').show();
            $('#coverImg_popover').show();
            var width = $(".upload-img").width();
            var height = $(".upload-img").height();
            //$.toast(width);
            var $image = $('.upload-img > img');
            // 配置缩略图
            uploaderImg.option("thumb", {
                width: 1920,
                height: 1920,
                quality: 90,// 图片质量，只有type为`image/jpeg`的时候才有效                
                allowMagnify: false,// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false                
                crop: false,// 是否允许裁剪
                type: 'image/jpeg'// 为空的话则保留原有图片格式，否则强制转换成指定的类型
            });
            //创建缩略图
            uploaderImg.makeThumb(file, function (error, src) {
                if (error) {
                    $image.replaceWith('<span>不能预览</span>');
                    return;
                }
                //将图片放入裁剪窗口
                $image.cropper({
                    minContainerWidth: width,
                    minContainerHeight: height
                });
                $image.cropper('reset', true).cropper('replace', src);
                $("html").css("overflow", "hidden");
                $("body").css("overflow", "hidden");
            });
        });
        uploaderImg.on('uploadBeforeSend', webUploaderBeforeSend);
    }
}
///文件上传前添加扩展参数
var webUploaderBeforeSend = function (block, data) {
    // 修改data中添加扩展参数
    var $image = $('.upload-img > img');
    //获取图片裁剪信息
    var canvasData = $image.cropper("getData", {});
    data.isCrop = true;
    data.x = canvasData.x;
    data.y = canvasData.y;
    data.width = canvasData.width;
    data.height = canvasData.height;
}
///执行图片上传
var Uploading = function () {
    uploaderImg.upload();
}


///图片裁剪处理
function CropperImg(ratio) {
    //图片上传
    var $image = $('.upload-img > img');
    $image.cropper({
        viewMode: 1,
        dragMode: 'move',//拖拽模式，'move':只能拖拽图片，'crop':可以通过拖拽新建裁剪窗口
        //      preview: '.img-preview', //不同尺寸预览区        
        aspectRatio: ratio, //裁剪比例，NaN-自由选择区域
        autoCropArea: 0.8, //初始裁剪区域占图片比例
        cropBoxMovable: false,//是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        cropBoxResizable: false,//是否允许改变剪裁框的大小
        crop: function (data) { //裁剪操作回调
            //var imgData = $image.cropper("getData", {});
            //var imgData2 = $image.cropper("getImageData", {});
            //var canvasData = $image.cropper("getCanvasData", {});
            //var CropBoxData = $image.cropper("getCropBoxData", {});
            //console.log(imgData);
            //console.log(imgData2);
            //console.log(canvasData);
            //console.log(CropBoxData);
        }
    });

    //var fileName; //选择上传的文件名
    //$('#btnImg input:file').change(function () {
    //    var file = this.files[0];
    //    fileName = file.name;
    //    var reader = new FileReader();
    //    //reader回调，重新初始裁剪区
    //    reader.onload = function () {
    //        // 通过 reader.result 来访问生成的 DataURL
    //        var url = reader.result;
    //        //选择图片后重新初始裁剪区
    //        $image.cropper('reset', true).cropper('replace', url);
    //    };
    //    reader.readAsDataURL(file);
    //});
}
