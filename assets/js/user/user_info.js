$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });
  const initUserinfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        layer.msg("获取用户信息成功！");
        //为表单快速赋值
        form.val("formUserInfo", res.data);
      },
    });
  };
  initUserinfo();
  //点击实现重置
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserinfo();
  });

  //更新用户信息
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更新用户信息失败！");
        layer.msg("更新用户信息成功！");
        // 调用父页面渲染函数
        window.parent.getUserInfo();
      },
    });
  });
  // 更新用户数据
  // $(".layui-form").on("submit", (e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     url: "/my/userinfo",
  //     data: $(".layui-form").serialize(),
  //     success: (res) => {
  //       if (res.status !== 0) return layer.msg("更新用户信息失败！");
  //       layer.msg("更新用户信息成功！");
  //       // 调用父页面渲染函数
  //       window.parent.getUserInfo();
  //     },
  //   });
  // });
});
