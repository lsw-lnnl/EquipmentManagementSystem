$(function () {  
    // 点击退出按钮退回到登录页面
    let $rightBar = $('#rightBar');
    $rightBar.find('a').click(function () {  
        location.href='/'; 
    });
    let $quit = $('#quitSys');
    $quit.click(function () {  
        location.href='/';
    });

    // 回到首页
    let $home = $('#goHome');
    $home.click(function(){
        $('#rightBar1').siblings().hide();
        $('#rightBar1').show();
    });

    //修改密码，点击确认按钮
    let username = 'lnnl';
    let $modifyPwdBox = $('#myModal');
    $modifyPwdBox.find("[name='modifyEnter']").click(function(){
        let oldPasswd = $modifyPwdBox.find("[name='oldPwd']").val();
        let newPasswd = $modifyPwdBox.find("[name='newPwd']").val();
        let confirmPasswd = $modifyPwdBox.find("[name='confirmPwd']").val();

        if(oldPasswd=='' || oldPasswd==null || oldPasswd==undefined){
            alert('旧密码不能为空');
            return;
        }
        if(newPasswd=='' || newPasswd==null || newPasswd==undefined){
            alert('新密码不能为空');
            return;
        }
        if(confirmPasswd!==newPasswd){
            alert('两次密码不一致');
            return;
        }
        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/modify',
            data:{
                username: username,                
                oldPassword: oldPasswd,
                newPassword: newPasswd
            },
            dataType:'json',
            success:function (result) { 
                if(!result.code) {
                    alert(result.message);
                    $modifyPwdBox.find("[name='oldPwd']").val('');
                    $modifyPwdBox.find("[name='newPwd']").val('');
                    $modifyPwdBox.find("[name='confirmPwd']").val('');
                }
                else{
                    alert(result.message);
                }
            }
        });
    });
    //修改密码，点击取消按钮
    $modifyPwdBox.find("[name='modifyCencel']").click(function () {
        $modifyPwdBox.find("[name='oldPwd']").val('');
        $modifyPwdBox.find("[name='newPwd']").val('');
        $modifyPwdBox.find("[name='confirmPwd']").val('');
    });

    // 左导航栏控制
    let $collapseOne = $('#collapseOne');
    $collapseOne.find('a').click(function () {  
        switch($(this).attr('id')){
            case 'col1_1':
                $('#rightBar2').siblings().hide();
                $('#rightBar2').show();
                showList();
                break;
            case 'col1_2':
                $('#rightBar3').siblings().hide();
                $('#rightBar3').show();
                break;
        }
    });

    // 显示设备列表
    function showList() {  
        let $rightBar2 = $('#rightBar2');
        $('#rightBar2 tr:gt(0)').html('');
        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/admin/equipment/list',
            data:{
                value: 'list'
            },
            dataType:'json',
            success:function (result) { 
                if(!result.code){
                    let tableObj = $('#equipmentList');
                    result.message.map(function (value) {  
                        let html = '<tr>';
                        for(var i in value){   
                            html = html + '<td>' + value[i] + '</td>';
                        }
                        html = html + "<td><a href='#modifyEquipment' data-toggle='modal' name='modifyInfo'>修改</a></td><td><a href='#deleteEquipment' data-toggle='modal'>删除</a></td></tr>";
                        tableObj.append($(html));
                    });
                }else{
                    alert(result.message);
                }
            }
        });
    }

    // 修改设备信息
    let $modifyEquipment =  $('#modifyEquipment');
    $modifyEquipment.on('shown.bs.modal', function (event) {  
        let button = $(event.relatedTarget);//获取触发模态框事件的按钮
        let datas = button.parent().prevAll();
        let textChange = false;
        // for(let i=datas.length-1; i>0; i--){
        //     alert(datas.eq(i).text());
        // }
        let id = $modifyEquipment.find("[name='id']");
        let name = $modifyEquipment.find("[name='name']");
        let buytime = $modifyEquipment.find("[name='buytime']");
        let supplier = $modifyEquipment.find("[name='supplier']");
        let price = $modifyEquipment.find("[name='price']");
        let station = $modifyEquipment.find("[name='station']");

        id.val(datas.eq(5).text());
        name.val(datas.eq(4).text());
        buytime.val(datas.eq(3).text());
        supplier.val(datas.eq(2).text());
        price.val(datas.eq(1).text());
        station.val(datas.eq(0).text());

        $modifyEquipment.find("[type='text']").change(function () {  
            textChange = true;
        });
        $modifyEquipment.find("[name='modifyEnter1']").off('click').on('click', function () {
            if(textChange){
                textChange = false;                
                // alert('修改数据');  
                // 通过ajax提交请求
                $.ajax({
                    type: 'post',
                    url: '/admin/equipment/modify',
                    data:{
                        equipID: id.val(),      
                        equipName: name.val(),
                        equipBuytime: buytime.val(),
                        equipSupplier: supplier.val(),      
                        equipPrice: price.val(),      
                        equipStation: station.val()
                    },
                    dataType:'json',
                    success:function (result) { 
                        if(!result.code){
                            showList();
                        }
                        alert(result.message);
                    }
                });             
            }
        });
    });


    // 删除设备
    let $deleteEquipment =  $('#deleteEquipment');
    $deleteEquipment.on('shown.bs.modal', function (event) {  
        let button = $(event.relatedTarget);//获取触发模态框事件的按钮
        let datas = button.parent().prevAll();
        let id = $deleteEquipment.find("[name='id']");
        let name = $deleteEquipment.find("[name='name']");
        let buytime = $deleteEquipment.find("[name='buytime']");
        let supplier = $deleteEquipment.find("[name='supplier']");
        let price = $deleteEquipment.find("[name='price']");
        let station = $deleteEquipment.find("[name='station']");

        id.val(datas.eq(6).text());
        name.val(datas.eq(5).text());
        buytime.val(datas.eq(4).text());
        supplier.val(datas.eq(3).text());
        price.val(datas.eq(2).text());
        station.val(datas.eq(1).text());

        $deleteEquipment.find("[name='deleteEnter']").off('click').on('click', function () {
            alert('删除数据');  
            // 通过ajax提交请求
            $.ajax({
                type: 'post',
                url: '/admin/equipment/delete',
                data:{
                    equipID: id.val()//,      
                    // equipName: name.val(),
                    // equipBuytime: buytime.val(),
                    // equipSupplier: supplier.val(),      
                    // equipPrice: price.val(),      
                    // equipStation: station.val()
                },
                dataType:'json',
                success:function (result) { 
                    if(!result.code){
                        showList();
                    }
                    alert(result.message);
                }
            });             
        });
    });


    //分页控制
    // $pagination1 = $('#pagination1');

    //添加设备
    let $rightBar3 = $('#rightBar3');
    $rightBar3.find("[type='button']").click(function(){
        let textName = $rightBar3.find("[type='text']").attr('name');
        switch(textName){
            case 'ID':
            case 'name':
                if($rightBar3.find(`[name= ${ textName } ]`).val()==''){
                    alert('设备编号和设备名必须填写');
                    return;
                }
                break;
        }
        let equipmentID = $rightBar3.find("[name='ID']").val();
        let equipmentName = $rightBar3.find("[name='name']").val();
        let equipmentBuytime = $rightBar3.find("[name='buytime']").val();
        let equipmentSupplier = $rightBar3.find("[name='supplier']").val();
        let equipmentPrice = $rightBar3.find("[name='price']").val();
        let equipmentStation = $rightBar3.find("option:selected").val();
        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/admin/equipment/add',
            data:{
                equipID: equipmentID,      
                equipName: equipmentName,
                equipBuytime: equipmentBuytime,
                equipSupplier: equipmentSupplier,      
                equipPrice: equipmentPrice,      
                equipStation: equipmentStation
            },
            dataType:'json',
            success:function (result) { 
                alert(result.message);
            }
        });
    });
    
    


    



});