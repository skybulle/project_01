$(function(){
    var timer = null
    var cacheObj = {}
    function debounceSearch(kw){
        timer = setTimeout(function(){
             getSuggestList(kw)
        },500)
    }
    $('#ipt').on('keyup',function(){
        //清空timer
        clearTimeout(timer)
       var keywords= $(this).val().trim()
       if(keywords.length <= 0){
        //如果关键词为空，则清空后隐藏搜索建议列表
        return $('#suggest-list').empty().hide()
       }
       if(cacheObj[keywords]){
        return renderSuggestList(cacheObj[keywords])
       }
       debounceSearch(keywords);
    })
    var getSuggestList = function(kw){
        $.ajax({
            url:'https://suggest.taobao.com/sug?q='+kw,
            dataType:'jsonp',
            success: function(res){
               renderSuggestList(res);
                
            }
        })
    }
    //渲染ui结构
    function renderSuggestList(res){
        if(res.result.length <= 0){
            return $('#suggest-list').empty().hide()
        }  
        var htmlStr = template('tpl-suggestList',res)
        $('#suggest-list').html(htmlStr).show()

        // 获取用户输入的内容当做键
        var k = $('#ipt').val().trim()
        cacheObj[k] = res
    }
})