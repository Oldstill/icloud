window.addEventListener("DOMContentLoaded",function(){
    var leftTitle=document.querySelector(".left-top");
    var leftList=document.querySelector(".left-list");
    var reightTop=document.querySelector(".right-top");
    var reightTitle=document.querySelector(".right-title");
    var rightList=document.querySelector(".uls");
    leftList.style.height=document.documentElement.clientHeight-leftTitle.offsetHeight+"px";
    rightList.style.height=document.documentElement.clientHeight-reightTop.offsetHeight-reightTitle.offsetHeight+"px";
});
var todo=[{
       id:1,
       titles:"列表1",
       color:"#FF2A6B",
        lists:[{
              title:"早上吃饭",
              done:false
              }, {
                title:"早上吃饭",
                done:false
              },
              {
                title:"早上吃饭",
                done:true
              }]
       },{
          id:2,
          titles:"列表2",
          color:"#CC75E1",
          lists:[{
           title:"早上吃饭",
           done:false
          },{
               title:"早上吃饭",
               done:false
           },
           {
               title:"早上9:00吃饭",
               done:true
           },{
                  title:"下午19:00吃饭",
                  done:true
              }]
        },
       {
       id:3,
       titles:"列表3",
       color:"#FF8300",
       lists:[{
           title:"早上吃饭",
           done:false
       },
           {
               title:"早上吃饭",
               done:false
           },
           {
               title:"早上12:00吃饭",
               done:true
           }]
   }];
    var colors=["#FF2A6B","#CC75E1","#FF8300","#63DA38","#1BADF7","#F7CA00","#A0825C"];
    var icloud=angular.module("icloud",[]);
    //icloud.controller("iclouds",function($scope,local){
        icloud.controller("iclouds",function($scope){
            //
            //$scope.todo=local.getData("todo");

        $scope.todo=todo;
        $scope.flag=false;
        $scope.index=$scope.todo.length-1;

      //选项：
        $scope.colors=colors;
        $scope.xflag=false;
        $scope.changetitle=$scope.todo[$scope.index].titles;
        $scope.changecolor=$scope.todo[$scope.index].color;
   //判断当前点击显示的下标
        $scope.check=function(i){
            $scope.index=i;
            $scope.changetitle=$scope.todo[i].titles;
            $scope.changecolor=$scope.todo[i].color;
            $scope.xflag=false;
        };
    //增加列表
     $scope.add=function(){
       $scope.ids=$scope.todo[$scope.todo.length-1].id+1;
       $scope.index= $scope.todo.length;
       $scope.todo.push({
               id:$scope.ids,
               titles:'列表'+$scope.ids,
               color:colors[$scope.todo.length%7],
               lists:[]
           })
         //local.saveData('todo',$scope.todo);
     };
    //完成数量
     $scope.donenum=0;
     $scope.doneNums=function(){
         $scope.donenum=0;
         var list =$scope.todo[$scope.index].lists;
         angular.forEach(list,function(v,i){
             if (v.done){
                 $scope.donenum++;
             }
         })
     }
        $scope.doneNums()
    //新增项目
     $scope.addList=function(){
         $scope.todo[$scope.index].lists.push({
             title:" ",
             done:false
         })
         //local.saveData('todo',$scope.todo)
     }
     //完成与未完成互选
     $scope.set=function(o,tf){
         o.done=tf;
         $scope.doneNums()
         local.saveData('todo',$scope.todo)
     }
     //修改
     $scope.change=function(o,text){
         o.title=text.target.innerHTML;
         //local.saveData('todo',$scope.todo)
     }
     //清除
     $scope.clar=function(){
       var list=$scope.todo[$scope.index].lists;
       var arr=[];
       angular.forEach(list,function(v,i){
           if(!v.done){
            arr.push(v)
           }
       })
         $scope.todo[$scope.index].lists=arr;
         $scope.doneNums();
         $scope.flag=false;
         //local.saveData('todo',$scope.todo)
     }

     //选项：
     //颜色
     $scope.xColor=function(x){
         $scope.changecolor=x;
     }
     //
     $scope.comChange=function(){
       var com=$scope.todo[$scope.index];
         com.title=$scope.changetitle;
         com.color=$scope.changecolor;
         $scope.xflag=false;
     //    local.saveData('todo',$scope.todo)
     }
    //删除
       $scope.delList=function(){
         $scope.todo.splice($scope.index,1);
         $scope.index=$scope.todo.length-1;
         $scope.xflag=false;
           //local.saveData('todo',$scope.todo)

       }
        $scope.$watch("index",function(){
        $scope.doneNums();
        $scope.flag=false;
        $scope.xflag=false;
            $scope.changetitle=$scope.todo[$scope.index].titles;
            $scope.changecolor=$scope.todo[$scope.index].color;
     })
    })

//服务
//icloud.factory('local',function(){
//    return {
//        getData:function(key){
//          var da=localStorage.getItem(key);
//          return da==null?[]:JSON.parse(da);
//        },
//        saveData:function(key,data){
//          localStorage.setItem(key,JSON.stringify(data))
//        },
//        delData:function(key){
//          localStorage.removeItem(key);
//        }
//    }
//})
