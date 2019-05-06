$(function(){

    //スプラッシュのアニメーション
    $.when(
        $('body, html').addClass('scrollHidden'),
        $('.cutting-line').delay(300).fadeIn(1200),
        $('#splash-inner').delay(800).fadeIn(1200),
        $('#splash-inner').delay(1700).fadeOut(300),
        $('.cutting-line').delay(1700).fadeOut(300),
        $('#splash-wrap').delay(3100).fadeOut(1200)
    ).done(function(){
        $('body, html').removeClass('scrollHidden')
    });
    
    //作品のカテゴリー（data-category）を判別して、カテゴリー名を表示する
    var $workItem = $('.js-workItem')
    for(var i = 0; i < $workItem.length; i++) {
        var $workItemIndex = $workItem.eq(i);
        var dataCategory = $workItemIndex.attr('data-category');
        var $workCategory = $workItemIndex.find('.js-workCategory');
        switch(dataCategory) {
            case "web":
                $workCategory.text('Web');
                break;
            case "app":
                $workCategory.text('App');
                break;
            case "printing":
                $workCategory.text('Printing');
                break;
            case "event":
                $workCategory.text('Event');
                break;
            case "photo":
                $workCategory.text('Photo');
                break;
            case "other":
                $workCategory.text('Other');
                break;
        }
    }

    //カテゴリーを選択するとタブが変更され、絞り込みをする
    $('.js-tabItem').click(function(){
        $('.js-tabLst').find('.active').removeClass('active');
        $(this).addClass('active');
        var fadeTime = 300;
        var delayTime = 300;
        //絞り込み処理
        var dataCategory = $(this).attr('data-category');
        var workItemWeb = $("li.js-workItem[data-category='web']")
        var workItemApp = $("li.js-workItem[data-category='app']")
        var workItemPrinting = $("li.js-workItem[data-category='printing']")
        var workItemEvent = $("li.js-workItem[data-category='event']")
        var workItemPhoto = $("li.js-workItem[data-category='photo']")
        var workItemOther = $("li.js-workItem[data-category='other']")
        switch(dataCategory) {
            case "all":
                workItemWeb.delay(delayTime).fadeIn(fadeTime);
                workItemApp.delay(delayTime).fadeIn(fadeTime);
                workItemPrinting.delay(delayTime).fadeIn(fadeTime);
                workItemEvent.delay(delayTime).fadeIn(fadeTime);
                workItemPhoto.delay(delayTime).fadeIn(fadeTime);
                workItemOther.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-all',
                  })
                break;
            case "web":
                workItemApp.fadeOut(fadeTime);
                workItemPrinting.fadeOut(fadeTime);
                workItemEvent.fadeOut(fadeTime);
                workItemPhoto.fadeOut(fadeTime);
                workItemOther.fadeOut(fadeTime);
                workItemWeb.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-web',
                  })
                break;
            case "app":
                workItemWeb.fadeOut(fadeTime);
                workItemPrinting.fadeOut(fadeTime);
                workItemEvent.fadeOut(fadeTime);
                workItemPhoto.fadeOut(fadeTime);
                workItemOther.fadeOut(fadeTime);
                workItemApp.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-app',
                  })
                break;
            case "printing":
                workItemWeb.fadeOut(fadeTime);
                workItemApp.fadeOut(fadeTime);
                workItemEvent.fadeOut(fadeTime);
                workItemPhoto.fadeOut(fadeTime);
                workItemOther.fadeOut(fadeTime);
                workItemPrinting.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-printing',
                  })
                break;
            case "event":
                workItemWeb.fadeOut(fadeTime);
                workItemApp.fadeOut(fadeTime);
                workItemPrinting.fadeOut(fadeTime);
                workItemPhoto.fadeOut(fadeTime);
                workItemOther.fadeOut(fadeTime);
                workItemEvent.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-event',
                  })
                break;
            case "photo":
                workItemWeb.fadeOut(fadeTime);
                workItemApp.fadeOut(fadeTime);
                workItemPrinting.fadeOut(fadeTime);
                workItemEvent.fadeOut(fadeTime);
                workItemOther.fadeOut(fadeTime);
                workItemPhoto.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-photo',
                  })
                break;
            case "other":
                workItemWeb.fadeOut(fadeTime);
                workItemApp.fadeOut(fadeTime);
                workItemPrinting.fadeOut(fadeTime);
                workItemEvent.fadeOut(fadeTime);
                workItemPhoto.fadeOut(fadeTime);
                workItemOther.delay(delayTime).fadeIn(fadeTime);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'link', 
                    eventAction: 'click', 
                    eventLabel: 'tabItem-other',
                  })
                break;
        }
    });

    //選択されたitemの高さを取得
    var workItemOffset;

    //作品を選択した際に作品鑑賞用のレイアウトに変更する
    $workItem.click(function(){
        var selectedItem = $(this);
        var workImgSrc = selectedItem.find('.js-workImg').attr('src');
        var workTitle = selectedItem.find('.work-title').text();
        var workCategory = selectedItem.find('.work-category').text();
        var workSentence = selectedItem.find('.work-sentence').text();
        workItemOffset = $(this).offset().top;
        $.when(
            $('.top-btn').hide(),
            $('.js-contentsTitle').hide(),
            $('.js-tabLst').hide(),
            $workItem.addClass('work-item-display'),
            $('.js-workLst').addClass('work-lst-display'),
            $('.js-contentsWrap').addClass('contents-wrap-display'),
            $workItem.removeClass('active-display'),
            selectedItem.addClass('active-display'),
            //作品の詳細を描画
            $('.js-displayWrap').addClass('display-wrap-show'),
            $('.js-detailTopImg').attr('src', workImgSrc),
            $('.js-activeWorkTitle').text(workTitle),
            $('.js-activeWorkCategory').text(workCategory),
            $('.js-activeWorkSentence').text(workSentence),
            $('.js-displayWrap').animate({'scrollTop': 0}, '200ms'),
            $('body, html').animate({'scrollTop': 0}, '200ms'),
            //SP用ハンバーガーメニューの色をdisplayモードのときに変更
            $('.panel-btn-icon').addClass('panel-btn-icon-display')
        ).done(function(){
            //選択されたItemが画面上部になるようスクロール
            var activeItemOffsetTop = selectedItem.offset().top + $('.js-contentsWrap').scrollTop();
            $('.js-contentsWrap').animate({'scrollTop': activeItemOffsetTop - 15}, '50ms');
            //spのbody背景をdisplayモードのときに変更
            if($(window).width()<671){
                $('body').addClass('display-background');
            }
            ga('send', {
                hitType: 'event',
                eventCategory: 'link', 
                eventAction: 'click', 
                eventLabel: workTitle,
              })
        });
    });

    //戻るボタンをクリックした際に元のレイアウトに変更する
    $('.js-backBtn').click(function(){
        returnFromDisplay();
        $('.js-tabLst').show();
        $('.panel-btn-icon').removeClass('panel-btn-icon-display');
        if($(window).width()<671){
            $('body, html').animate({'scrollTop': workItemOffset-32}, '200ms')
            $('body').removeClass('display-background');
        }
    });

    if($(window).width()<671){
        //ページトップに戻るボタンの表示を制御
        var $topBtn = $('.top-btn');
        $(window).scroll(function(){
            //ディスプレイモードかどうか
            var displayMode = $('.js-contentsWrap').hasClass('contents-wrap-display');
            if(displayMode){
                $topBtn.hide();
            }else{
                if($(this).scrollTop()>100){
                    $topBtn.fadeIn('50ms');
                }else{
                    $topBtn.fadeOut('50ms');
                }
            }
        });
        $topBtn.click(function(){
            //animateがwindowに使用できないので、body, htmlを指定
            $('body, html').animate({'scrollTop': 0}, '200ms');
        });
    }else{
        //ページトップに戻るボタンの表示を制御
        scrollTopBtn($('.js-contentsWrap'));
    }
    
    //ページ切り替えのアクション
    $('.js-navItem').click(function(){
        $('.js-navLst').find('.active').removeClass('active');
        $(this).addClass('active');
        var pageNum = $('.js-navItem').index($(this));
        if(pageNum == 0) {
            //gallery
            $('.js-mainProfileContainer').removeClass('main-profile-container-show');
            $('.js-mainArticleContainer').removeClass('main-article-container-show');
            $('.js-mainGalleryContainer').addClass('main-gallery-container-show');
            $('.js-contentsWrap').removeClass('contents-wrap-profile');
            $('.js-contentsWrap').removeClass('contents-wrap-article');
            $('.js-tabLst').show();
            $('.navi-wrap').removeClass('active-navi-wrap');
            $('#panel').slideToggle(200);
            $('.panel-btn-icon').toggleClass("close");
            $('body, html').animate({'scrollTop': 0}, '200ms');
            $('body, html').removeClass('scrollHidden');
        }else if(pageNum == 1){
            //profile
            $('.js-mainGalleryContainer').removeClass('main-gallery-container-show');
            $('.js-mainArticleContainer').removeClass('main-article-container-show');
            $('.js-mainProfileContainer').addClass('main-profile-container-show');
            $('.js-contentsWrap').addClass('contents-wrap-profile');
            $('.js-contentsWrap').removeClass('contents-wrap-article');
            $('.top-btn').hide();
            returnFromDisplay();
            $('.navi-wrap').removeClass('active-navi-wrap');
            $('#panel').slideToggle(200);
            $('.panel-btn-icon').toggleClass("close");
            $('body, html').animate({'scrollTop': 0}, '200ms');
            $('body, html').removeClass('scrollHidden');
        }else if(pageNum == 2){
            //article
            $('.js-mainGalleryContainer').removeClass('main-gallery-container-show');
            $('.js-mainProfileContainer').removeClass('main-profile-container-show');
            $('.js-mainArticleContainer').addClass('main-article-container-show');
            $('.js-contentsWrap').addClass('contents-wrap-article');
            $('.js-contentsWrap').removeClass('contents-wrap-profile');
            $('.top-btn').hide();
            returnFromDisplay();
            $('.navi-wrap').removeClass('active-navi-wrap');
            $('#panel').slideToggle(200);
            $('.panel-btn-icon').toggleClass("close");
            $('body, html').animate({'scrollTop': 0}, '200ms');
            $('body, html').removeClass('scrollHidden');
        }
    });
    toggleNaviDisplay();

    //articleのイベントトラッキング
    $('.article-item').click(function(){
        var articleTitle = $(this).find('.article-title').text();
        ga('send', {
            hitType: 'event',
            eventCategory: 'link', 
            eventAction: 'click', 
            eventLabel: articleTitle,
          })
    });
});

//一定以上スクロールすると表示され、クリックするとトップにスクロールするメソッド
var scrollTopBtn = function(scrollClass){
    var $topBtn = $('.top-btn');
    scrollClass.scroll(function(){
        //ディスプレイモードかどうか
        var displayMode = $('.js-contentsWrap').hasClass('contents-wrap-display');
        if(displayMode){
            $topBtn.hide();
        }else{
            if($(this).scrollTop()>100){
                $topBtn.fadeIn('50ms');
            }else{
                $topBtn.fadeOut('50ms');
            }
        }
    });
    $topBtn.click(function(){
        scrollClass.animate({'scrollTop': 0}, '200ms');
    });
}

//displayからの復帰処理
var returnFromDisplay = function(){
    $('.js-displayWrap').removeClass('display-wrap-show');
    $('.js-workItem').removeClass('active-display');
    $('.js-contentsWrap').removeClass('contents-wrap-display');
    $('.js-workLst').removeClass('work-lst-display');
    $('.js-workItem').removeClass('work-item-display');
    $('.js-contentsTitle').show();
}

//SP用ハンバーガーメニューのアクション
var toggleNaviDisplay = function(){
    $('#panel-btn').click(function() {
        $('#panel').slideToggle(200);
        $('.panel-btn-icon').toggleClass('close');
        $('.navi-wrap').toggleClass('active-navi-wrap');
        //ディスプレイモードかどうか
        var displayMode = $('.js-contentsWrap').hasClass('contents-wrap-display');
        if(displayMode){
            $('.panel-btn-icon').toggleClass('panel-btn-icon-display');
        }
        var naviMode = $('.navi-wrap').hasClass('active-navi-wrap');
        if(naviMode){
            $('body, html').addClass('scrollHidden');
        }else{
            $('body, html').removeClass('scrollHidden');
        }
        return false;
      });
}