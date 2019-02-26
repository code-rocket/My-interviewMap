/**
 * -----------------------
 * for sort page
 * -----------------------
 */
// https://blog.csdn.net/weixin_38830382/article/details/79173384
{

    /**
     * 选择排序 - 单向选择排序
     * @param arr
     * @returns {*}
     */
    let selectionSort = (arr) => {
        console.time('选择排序耗时');
        for (let i = 0; i < arr.length - 1; i++) {
            let minPos = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minPos]) {
                    minPos = j;
                }
            }
            if (arr[minPos] !== arr[i]) {
                swap(arr, minPos, i);
            }
        }

        function swap(arr, a, b) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        console.timeEnd('选择排序耗时');
        return arr;
    };


    /**
     * 选择排序 - 双向选择排序（每次循环，同时选出最大值放在末尾，最小值放在前方）
     * @param arr
     * @returns {*}
     */
    let selectionSort2 = (arr) => {
        console.time('选择排序耗时');
        for (let i = 0; i <= arr.length / 2 - 1; i++) {
            let minPos = i, maxPos = arr.length - i - 1;
            for (let j = i; j < arr.length - i; j++) {
                if (arr[j] < arr[minPos]) {
                    minPos = j;
                }

                if (arr[maxPos] < arr[j]) {
                    maxPos = j;
                }
            }

            if (arr[minPos] !== arr[i]) {
                swap(arr, i, minPos);
            }
            if (arr[maxPos] !== arr[arr.length - i - 1]) {
                if (maxPos === i) {//若当前最大值在循环起始位置，则最大值一定在(1)处被交换到了minPos的位置
                    maxPos = minPos;
                }
                swap(arr, maxPos, arr.length - i - 1);
            }
        }

        function swap(arr, a, b) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        console.timeEnd('选择排序耗时');
        return arr;
    };


    /**
     * 冒泡排序1
     * 在某些时候，循环还未终止，整个数组已经排好序，此时应及时终止循环。
     *（冒泡每次都会比较相邻两个数并交换次序不对的组，若一次循环后，都没进行交换，则已经完成排序）
     * @param arr
     */
    let bubbleSort1 = (arr) => {
        function swap(arr, a, b) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        console.time('冒泡排序耗时');
        //依次将最大的数放置到数组末尾，将第二大的数放到倒数第二位...
        let isFinish;
        for (let i = 0; i < arr.length; i++) {
            isFinish = true;
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    isFinish = false;
                }
            }
            if (isFinish) {
                break;
            }
        }
        console.timeEnd('冒泡排序耗时');
        return arr;
    };


    /**
     * 冒泡排序 - 升级版 - CockTail
     * 鸡尾酒是冒泡排序的升级版，该排序从左往右找出最大值后，再从右往左
     * 找出最小值，类似鸡尾酒搅拌左右循环。在某些情况下，优于冒泡排序，
     * 以序列(2,3,4,5,1)为例，鸡尾酒排序只需要访问两次（升序降序各一次 ）
     * 次序列就可以完成排序，但如果使用冒泡排序则需要四次。
     * @param arr
     */
    let bubbleSort2 = (arr) => {
        function swap(arr, a, b) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        console.time('冒泡排序耗时');
        //依次将最大的数放置到数组末尾，将第二大的数放到倒数第二位...
        let isFinish;
        for (let i = 0; i < arr.length; i++) {
            isFinish = true;
            //从前往后,比较相邻两个数,把大的放在后边.之前已放置成功的可以不再参与比较
            for (let j = i; j < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    isFinish = false;
                }
            }
            if (isFinish) {
                break;
            }
            for (let j = arr.length - i; j > i; j--) {
                if (arr[j] < arr[j - 1]) {
                    swap(arr, j, j - 1);
                    isFinish = false;
                }
            }
            if (isFinish) {
                break;
            }
        }
        console.timeEnd('冒泡排序耗时');
        return arr;
    };

    const arr = [2, 4, 6, 8, 1, 2, 5, 6, 8, 3, 4, 7, 2, 4, 6, 9, 6, 7, 0];
    // console.log(selectionSort(arr));
    // console.log(selectionSort2(arr));
    console.log(bubbleSort1(arr));
    console.log(bubbleSort2(arr));
}


