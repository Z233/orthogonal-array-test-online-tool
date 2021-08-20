import axios from "axios";

export default function(values, success, error) {

    
    // 判断是否有因素为空
    let hasEmpty;
    
    for (let arr of values) {
        hasEmpty = true;
        for (let str of arr) {
            if (str.length) {
                hasEmpty = false;
                break;
            }
        }
        if (hasEmpty) break;
    }

    if (hasEmpty) throw error("存在某一因素的水平为空，请检查输入");

    // 过滤水平中的空字符串
    const filterValues = values.map(arr => arr.filter(v => v)).filter(v => v.length);

    // 生成因素、水平的计数数据
    const countedValues = filterValues.reduce((acc, cur, idx) => {
        if (cur.length in acc) {
            acc[cur.length]++;
        } else {
            acc[cur.length] = 1;
        }
        return acc;
    }, {});

    // 属性是 m 水平数，值是 k 因素数
    // { '2': 1, '5': 5 }
    
    // 计算 n 值
    const n = Object.keys(countedValues).reduce((acc, cur) => {
        acc = acc + (parseInt(cur) - 1) * countedValues[cur];
        return acc;
    }, 1);

    // 取 m 中的最大
    const maxM = Math.max(...Object.keys(countedValues).map(v => parseInt(v)));

    // 计算 k 的和
    const sumK = Object.keys(countedValues).reduce((acc, cur) => {
        acc = acc + countedValues[cur];
        return acc;
    }, 0);

    axios
        .get("./js/data.json")
        .then(res => {
            // 寻找要套用的正交表
            const models = [];
            const judge = item => item.m.some((v, i) => v >= maxM && item.k[i] >= sumK);
            let hasFound = false;
            res.data.forEach(item => {
                if (item.n == n && judge(item)) {
                    models.push(item);
                    hasFound = true;    
                } else if (item.n > n && !hasFound && judge(item)) {
                    models.push(item);
                }
            });

            // arr 表示所所筛选出来的正交表当中试验次数最少的那个正交表
            const arr = models[0].case;
            let matrix = Array(arr.length).fill().map(() => Array(arr[0].replace(" ", "").length).fill());
            let hasDouble = false;

            for (let i = 0; i < arr[0].length; i++) {
                let res = [];
                for (let str of arr) {
                    if (hasDouble) {
                        res.push(parseInt(str[i - 1] + str[i]));
                    }

                    if (str[i].trim() == "") {
                        hasDouble = true;
                        break;            
                    } else if(!hasDouble) {
                        res.push(parseInt(str[i]));
                    }
                }
                if (res.length) {
                    for (let j = 0; j < res.length; j++) {
                        matrix[j][i] = res[j];
                    }
                }
            }

            success(filterValues, matrix);
        })
        .catch(err => {
            throw error(err);
        });
}