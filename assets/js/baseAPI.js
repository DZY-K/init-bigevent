// 注意：每次调用$.get() ,$.post(),$.ajax()的时候
// 都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
  $(function(){
    $.ajaxPrefilter(function(options){
      options.url='http://www.liulongbin.top:3007'
    +options.url
    })
  })
  
  