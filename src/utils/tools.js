export class Tools {
    constructor(){}
    loadScript(src, callback = function(){}) {
        var script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0];
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = src;
        if (script.addEventListener) {
            script.addEventListener('load', function () {
                callback();
            }, false);
        } else if (script.attachEvent) {
            script.attachEvent('onreadystatechange', function () {
                var target = window.event.srcElement;
                if (target.readyState == 'loaded') {
                    callback();
                }
            });
        }
        head.appendChild(script);
    }
    setTitle(pageTitle,siteTitle){
        if (pageTitle){
            return `${pageTitle}  -  ${siteTitle}`
        }
        return `${siteTitle}`
    }
    getTimeToStamp(dateTimeStamp){
        dateTimeStamp = Date.parse(dateTimeStamp)
        let minute = 1000 * 60;      
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime();   //获取当前时间毫秒
        let result = ''
        let diffValue = now - dateTimeStamp;//时间差
    
        if(diffValue < 0){
            return;
        }
        let minC = diffValue/minute;  //计算时间差的分，时，天，周，月
        let hourC = diffValue/hour;
        let dayC = diffValue/day;
        let weekC = diffValue/week;
        let monthC = diffValue/month;
        if(monthC >= 1 && monthC <= 3){
            result = " " + parseInt(monthC) + "月前"
        }else if(weekC >= 1 && weekC <= 3){
            result = " " + parseInt(weekC) + "周前"
        }else if(dayC >= 1 && dayC <= 6){
            result = " " + parseInt(dayC) + "天前"
        }else if(hourC >= 1 && hourC <= 23){
            result = " " + parseInt(hourC) + "小时前"
        }else if(minC >= 1 && minC <= 59){
            result =" " + parseInt(minC) + "分钟前"
        }else if(diffValue >= 0 && diffValue <= minute){
            result = "刚刚"
        }else {
            let datetime = new Date();
            datetime.setTime(dateTimeStamp);
            let Nyear = datetime.getFullYear();
            let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    }

    createPaging(item,page,numb)
    {
        item = item || 1;
        page = page || 4;
        numb = numb || 7;
        
        let [result, mean] = [[],[]];

        if(item > page) item = page;
        if(item <= 0) item = 1;

        if(numb % 2 == 0) mean = numb / 2;
        else mean = (numb-1)/2;

        let min = ((item - mean) <= 0) ? 1 : item - mean;
        let max = item + mean;
        
        if(numb % 2 == 0){
            if(min <= 0 || item <= numb) [min = 1, max = numb];
            else if(item > page-numb) [min = page-numb+1, max = page];
            else [min = item-mean+1, max = min + numb-1];
            if(max >= page) max = page;
        }else{
            if(min <= 0) min = 1;
            if(max >= page) max = page;
            else if(item <= mean+1 && item <= page) max = numb;
            // if(item > page-(mean+1)) min = page-(numb-1);
        }

        result = this.createArray(min,max)

        return result;
    };
    createArray(min = 1 , max = 7, step = 1)
    {
        let result = [];
        let len = Math.abs(max - min);
        if (len <= 0) result;
        let arr = new Array(len);
        let cNum = min;
        let cIndex = 0;
        let addArr = (index) => {
            if (cNum >= min && cNum <= max) {
                arr[index] = cNum;
                cNum++;
                cIndex++;
                addArr(cIndex, cNum)
            }
        }
        addArr(cIndex, cNum);
        result = arr.filter(item => item % step == 0);
        return result;
    }

    getRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // timetostamp 时间戳转换成时间,返回时间格式为：xx年xx月xx日，xx月前，xx周前，xx天前，xx小时前，xx分钟前，刚刚
    timetostamp(time) {
        let date = new Date(time * 1000);
        let now = new Date();
        let diffValue = now - date;
        let diffType = "";
        let result = "";
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let month = day * 30;
        let year = day * 365;
        if (diffValue < 0) {
            return "刚刚";
        }
        let yearC = diffValue / year;
        let monthC = diffValue / month;
        let weekC = diffValue / week;
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        if (yearC > 1) {
            diffType = "年";
        }
        else if (monthC > 1) {
            diffType = "个月";
        }
        else if (weekC > 1) {
            diffType = "周";
        }
        else if (dayC > 1) {
            diffType = "天";
        }
        else if (hourC > 1) {
            diffType = "小时";
        }
        else if (minC > 1) {
            diffType = "分钟";
        }
        else {
            diffType = "秒";
        }
        if (diffValue > year) {
            result = parseInt(yearC) + diffType + "前";
        }
        else if (diffValue > month) {
            result = parseInt(monthC) + diffType + "前";
        }
        else if (diffValue > week) {
            result = parseInt(weekC) + diffType + "前";
        }
        else if (diffValue > day) {
            result = parseInt(dayC) + diffType + "前";
        }
        else if (diffValue > hour) {
            result = parseInt(hourC) + diffType + "前";
        }
        else if (diffValue > minute) {
            result = parseInt(minC) + diffType + "前";
        }
        else {
            result = "刚刚";
        }
        return result;
    }


}