//新增一個商品清單的物件
var shoplist={};
shoplist={
  name: "MyBuylist 購物清單",
  time: "2017/03/22",
  list:[
     {name: "吹風機",price: 1},
     {name: "麥克筆",price: 2},
     {name: "筆記型電腦",price: 3},
     {name: "Iphone 9",price: 4},
     {name: "神奇海螺",price: 5}
  ]
};

// ------------------------------------------------------------
// --------------------------本次新增--------------------------
// 增加AJAX
var buy_url="http://www.monoame.com/awi_class/api/command.php?type=get&name=itemdata";
$.ajax({
  url: buy_url,
  success: function(res){
    // console.log(res);
    shoplist.list=JSON.parse(res);
    show_list();
  }
});

// ------------------------------------------------------------
// ------------------------------------------------------------

//模板
//定義元素用的html模板，{{名稱}}代表要套入的地方
var items_list_html="<li id={{id}} class='buy_item'>{{num}}.{{name}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

var total_html="<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

//取代模板位置成資料replace(要取代的,取代成...)

function show_list(){
  //好先清空html，否則下次會存到舊資料。
  $("#items_list").html("");
  var total_price=0;
  
  for(var i=0;i<shoplist.list.length;i++){
    var item_id="buyitem_"+i;
    var item=shoplist.list[i];
    var del_item_id="del_buyitem_"+i;
    
    //parseInt()轉成整數型態，因預設是字串
    total_price+=parseInt(shoplist.list[i].price);
    
    var current_item_html=
      items_list_html.replace("{{id}}",item_id)
                     .replace("{{num}}",i+1)
                     .replace("{{name}}",item.name)
                     .replace("{{price}}",item.price)
                     .replace("{{del_id}}",del_item_id)
                     .replace("{{del_item_id}}",i);
    
    $("#items_list").append(current_item_html);
  
  //刪除某一項
   // $("#"+item_id).click(
    $("#"+del_item_id).click(
      function(){
      // remove_item(item_id);
      //傳進去參數應該要是id
      //解決的方式是，在產生刪除按鈕的模板裡面，
      //塞一項attr名稱為data-delid(要刪除的id)，
      //動態抓取現在這個按鈕要刪除的id即可
      remove_item(parseInt($(this).attr("data-delid")));
      }
    );
  }//for
  
  var current_total_html = total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
}

//先顯示一次，因為前面只定義好function 還沒有執行
show_list();

//新增產品
$(".addbtn").click(function(){
    shoplist.list.push(
     {
     name: $("#input_name").val(),
     price: $("#input_price").val()
     }
    );
    name: $("#input_name").val("");
    price: $("#input_price").val("");
    show_list();
}
);

//刪除項目 陣列.splice(位置,長度) 
//刪除資料->重新根據資料渲染清單
function remove_item(id){
  shoplist.list.splice(id,1);
  //刪完後要更新頁面
  show_list();
};
