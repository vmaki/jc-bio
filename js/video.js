

        $(function () {
            var playVideo = $('.playContent video');
            var playPause = $('.playContent .playPause'); //播放和暂停
            var currentTime = $('.playContent .timebar .currentTime'); //当前时间
            var duration = $('.playContent .timebar .duration'); //总时间
            var progress = $('.playContent .timebar .progress-bar'); //视频进度条
            var volumebar = $('.playContent .volumeBar .volumewrap').find('.progress-bar');//音量进度条


            // .panel-2 .con .con_s .willesPlay .close1
            // 第二屏的视频关闭按钮
            var close_video = $('.content .video .willesPlay .close1');
            close_video.click(function() {
                playVideo.trigger('pause');
            });

            $('.content .video .willesPlay .shade').click(function() {
                playVideo.trigger('pause');
            })



            // 视频弹层显示后控制视频播放和暂停封装
            function isShow() {
                if ($('.playContent .playTip').is(':hidden')) {
                    playVideo.trigger('pause');
                    playPause.css({
                        'background-image': 'url("/public/assets/img/indexImg/stop2.png")'
                    });
                    $('.playContent .playTip').fadeIn();
                } else {
                    playVideo.trigger('play');
                    playPause.css({
                        'background-image': 'url("/public/assets/img/indexImg/kaishi.png")'
                    });
                    $('.playContent .playTip').fadeOut();                 
                };
            };
            // 控制条的控制播放与暂停
            playPause.click(function() {  
                isShow();
            });
            // 点击视频控制播放与暂停   
            $('.willesPlay video').on('click', function () {
                isShow();
            });        
            // 点击视频上的暂停按钮
            $('.willesPlay .playContent .playTip').on('click', function () {
                isShow();
            });  


            // 第二屏的点击视频
            var show_video = $('.content .video .video_bg');

            show_video.on('click', function () {
                playControl($('.content .video .willesPlay'));
            });


            //初始化音量
            for (var i = 0; i < playVideo.length; i++) {
                (function (i) {
                    playVideo[i].volume = 0.4; //初始化音量
                    var container = $(this).parents('.willesPlay');

                    $(this).on('loadedmetadata', function () {
                        duration.text(formatSeconds(playVideo[0].duration));
                    });

                })(i);
            }

            // 视频播放进度
            playVideo.each(function (i) {

                var container = $(this).parents('.willesPlay');
                $(this).on('loadedmetadata', function () {
                    container.find('.duration').text(formatSeconds(this.duration));
                });


                $(this).on('timeupdate', function () {
                    container.find('.currentTime').text(formatSeconds(this.currentTime));
                    container.find('.timebar .progress-bar').css('width', 100 * this.currentTime / this.duration + '%');
                });

                $(this).on('ended', function () {
                    container.find('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
                    container.find(' .playControll .playPause').css({
                        'background-image': 'url("/public/assets/img/indexImg/stop2.png")'
                    })
                });
            });

            $(window).keyup(function (event) {

                event = event || window.event;
                if (event.keyCode == 32) playControl();
                if (event.keyCode == 27) {
                    $('.fullScreen').removeClass('cancleScreen');
                    $('#willesPlay .playControll').css({
                        'bottom': 0,
                    }).removeClass('fullControll');
                }

                event.preventDefault();
            });


            //全屏
            $('.fullScreen').on('click', function () {
                var container = $(this).parents('.willesPlay');
                var playVideo = container.find('video')[0];
                if ($(this).hasClass('cancleScreen')) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozExitFullScreen) {
                        document.mozExitFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                    $(this).removeClass('cancleScreen');
                    container.find('.willesPlay .playControll').css({
                        'bottom': 0,
                    }).removeClass('fullControll');
                } else {
                    if (playVideo.requestFullscreen) {
                        playVideo.requestFullscreen();
                    } else if (playVideo.mozRequestFullScreen) {
                        playVideo.mozRequestFullScreen();
                    } else if (playVideo.webkitRequestFullscreen) {
                        playVideo.webkitRequestFullscreen();
                    } else if (playVideo.msRequestFullscreen) {
                        playVideo.msRequestFullscreen();
                    }
                    $(this).addClass('cancleScreen');
                    container.find('.willesPlay .playControll').css({
                        'left': 0,
                        'bottom': 0,
                    }).addClass('fullControll');
                }
                return false;
            });

            //点击音量显示与隐藏
            $('.volume').on('click', function (e) {
                var container = $('.willesPlay');
                e = e || window.event;
                e.stopPropagation();
                if (container.find('.otherControl .progress').is(':hidden')) {
                    container.find('.otherControl .progress').css('display', 'block');
                } else {
                    container.find('.otherControl .progress').css('display', 'none');
                }
            });

            // 音量控制
            $('.volumeBar').on('click mousewheel DOMMouseScroll', function (e) {
                var container = $(this).parents('.willesPlay');

                e = e || window.event;
                volumeControl(e, container);
                e.stopPropagation();
                return false;
            });


            // 点击视频控制条到对应位置
            $('.timebar .progress').mousedown(function (e) {
                e = e || window.event;
                updatebar(e.pageX, $(this).parents('.willesPlay'));
            });

            // 点击视频控制条到对应位置封装
            var updatebar = function (x, container) {
                var video = container.find('video')[0];
                var progress = container.find('.timebar .progress-bar');
                var maxduration = video.duration; //Video
                var positions = x - progress.offset().left; //Click pos
                var percentage = 100 * positions / container.find('.timebar .progress').width();
                //Check within range
                if (percentage > 100) {
                    percentage = 100;
                }
                if (percentage < 0) {
                    percentage = 0;
                }

                //Update progress bar and video currenttime
                progress.css('width', percentage + '%');
                video.currentTime = maxduration * percentage / 100;
            };


            //音量控制的封装
            function volumeControl(e, container) {
                e = e || window.event;
                var eventype = e.type;
                var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                var positions = 0;
                var percentage = 0;
                if (eventype == "click") {

                    volumebar = container.find('.volumeBar .volumewrap').find('.progress-bar');

                    positions = volumebar.offset().top - e.pageY;
                    percentage = 100 * (positions + volumebar.height()) / container.find('.volumeBar .volumewrap').height();
                } else if (eventype == "mousewheel" || eventype == "DOMMouseScroll") {
                    percentage = 100 * (volumebar.height() + delta) / container.find('.volumeBar .volumewrap').height();
                }
                if (percentage < 0) {
                    percentage = 0;
                    container.find('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-off');
                }
                if (percentage > 50) {
                    container.find('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-up');
                }
                if (percentage > 0 && percentage <= 50) {
                    container.find('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-down');
                }
                if (percentage >= 100) {
                    percentage = 100;
                }
                container.find('.volumewrap .progress-bar').css('height', percentage + '%');
                var playVideo = container.find('video')[0];
                playVideo.volume = percentage / 100;
                e.stopPropagation();
                e.preventDefault();
            }

            // 视频开关的封装
            function playControl(container) {
                var video = container.find('video')[0];
                if (container.is(':visible')) {
                    container.find('.playControll .playPause').css({
                        'background-image': 'url("/public/assets/img/indexImg/kaishi.png")'
                    });
                    container.find('video').trigger('play');
                } else {
                    container.find('.playControll .playPause').css({
                        'background-image': 'url("/public/assets/img/indexImg/stop2.png")'
                    });
                    container.find('video').trigger('pause');
                }
            }

        });


        //秒转时间
        function formatSeconds(value) {
            value = parseInt(value);
            var time;
            if (value > -1) {
                hour = Math.floor(value / 3600);
                min = Math.floor(value / 60) % 60;
                sec = value % 60;
                day = parseInt(hour / 24);
                if (day > 0) {
                    hour = hour - 24 * day;
                    time = day + "day " + hour + ":";
                } else time = hour + ":";
                if (min < 10) {
                    time += "0";
                }
                time += min + ":";
                if (sec < 10) {
                    time += "0";
                }
                time += sec;
            }
            return time;
        }