import "@/assets/toast/jquery.toast.min.css"
import "@/assets/toast/jquery.toast.min.js"
export const toast = {
    success(msg,title='Success',callback){
        $.toast({
            heading: title,
            text: msg,
            position: 'top-right',
            icon: 'success',
            loader: true,
            loaderBg: '#63CB89',
            afterHidden:callback || function(){}
        })
    },

    //失败提示框
    error(msg,title='Error',callback){
        $.toast({
            heading: title,
            text: msg,
            position: 'top-right',
            icon: 'error',
            loader: true,
            loaderBg: '#ec5e69',
            afterHidden:callback || function(){}
        })
    },

    //警告提示框
    warning(msg,title='Warning',callback){
        $.toast({
            heading: title,
            text: msg,
            position: 'top-right',
            icon: 'warning',
            loader: true,
            loaderBg: '#f5ca1e',
            afterHidden:callback || function(){}
        })
    },

    //信息提示框
    info(msg,title='Information',callback){
        $.toast({
            heading: title,
            text: msg,
            position: 'top-right',
            icon: 'info',
            loader: true,
            loaderBg: '#0070E0',
            afterHidden:callback || function(){}
        })
    }
}