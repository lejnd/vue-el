import moment from 'moment';
import { Notification } from 'element-ui';

moment.locale('zh-cn');
export default {
    isNoSelected(selectedList) {
        if (selectedList.length === 0) {
            Notification({
                title: '提示',
                message: '请至少选择一条数据',
                type: 'warning',
            });
            return true;
        }
        return false;
    },
    isSingleSelected(selectedList) {
        if (selectedList.length > 1) {
            this.$alert('只能选择一条记录进行操作，请重新选择', '提示', {
                confirmButtonText: '确定',
            });
            return false;
        }
        return true;
    },
    // 数组验证错误的子元素
    isFalseSelected(selectedList, falseChild) {
        let isFalse = selectedList.includes(falseChild);
        if (isFalse) {
            Notification({
                title: '提示',
                message: '您选择的数据有误！',
                type: 'warning',
            });
        }
        return isFalse;
    },
    // 多个短地址转为一个长地址
    formatAddress(originData) {
        return Object.keys(originData).reduce((str, key) => str + (originData[key].name || ''), '');
    },
    formatTime(originTime) {
        if (!originTime) return null;
        return moment(originTime).format('YYYY-MM-DD HH:mm:ss');
    },
    formatDate(originTime) {
        if (!originTime) return null;
        return moment(originTime).format('YYYY-MM-DD');
    },
    // 将结束时间设置为当天的23:59:59
    changeTime(time, islast) {
        if (time) {
            const date = {
                year: time.getFullYear(),
                month: (time.getMonth() + 1 < 10) ? `0${time.getMonth() + 1}` : time.getMonth() + 1,
                day: (time.getDate() < 10) ? `0${time.getDate()}` : time.getDate(),
                hours: (time.getHours() < 10) ? `0${time.getHours()}` : time.getHours(),
                minutes: (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes(),
                seconds: (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds(),
            };
            if (islast) {
                return `${date.year}-${date.month}-${date.day} 23:59:59`;
            }
            return `${date.year}-${date.month}-${date.day} 00:00:00`;
            // return `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes}:${date.seconds}`;
        }
        return false;
    },
    // 搜索时时间范围验证
    isTimeError(startTime, endTime) {
        if (startTime > endTime && endTime !== '') {
            Notification({
                title: '提示',
                message: '请选择正确的时间范围',
                type: 'warning'
            });
            return true;
        }
        return false;
    },
    // 递归创建地区树
    createTree(list) {
        return list.map((item) => {
            const targetItem = {};
            targetItem.value = item.code;
            targetItem.label = item.name;
            if (item.subRegionList.length > 0) {
                targetItem.children = this.createTree(item.subRegionList);
            }
            return targetItem;
        });
    },
    // 通知
    warningTip(msg) {
        Notification({
            title: '警告',
            message: msg,
            type: 'warning'
        });
    },
    errorTip(msg) {
        Notification({
            title: '错误',
            message: msg,
            type: 'error'
        });
    },
    successTip(msg = '操作成功') {
        Notification({
            title: '成功',
            message: msg,
            type: 'success'
        });
    },
};
