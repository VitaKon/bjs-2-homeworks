// Задача № 1
function cachingDecoratorNew(func) {
    const cache = [];
    const maxCount = 5;
    return function (...args) {
        const hash = md5(args);
        const index = cache.findIndex((element) => element.hash === hash);
        if (index !== -1) {
            return 'Из кэша: ' + cache[index].value;
        }
        if (cache.length === maxCount) {
            cache.shift();
        }
        cache.push({ hash, value: func(...args) });
        return 'Вычисляем: ' + cache[cache.length - 1].value;
    };
};

// Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId = null;
    wrapper.allCount = 0;
    wrapper.count = 0;
    function countWrapper(...args) {
        wrapper.count++;
        func(...args);
    }
    function wrapper(...args) {
        wrapper.allCount++;
        if (wrapper.count !== 0) {
            if (timeoutId) {
                const tempId = timeoutId;
                timeoutId = null;
                clearTimeout(tempId);
            }
            timeoutId = setTimeout(() => {
                timeoutId = null;
                countWrapper(...args);
            }, delay);
        } else {
            countWrapper(...args);
        }
    };
    return wrapper;
}
