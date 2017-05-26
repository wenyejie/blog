# ngRepeat根据某个属性去重
```ecmascript 6
angular
  .module('app')
  .filter('unique', uniqueFilter);

/**
 * 根据某个属性去重
 * @return {Function}
 */
function uniqueFilter () {
  return function (lists, name) {
    let result = [], keys = [];
    angular.forEach(lists, function (item) {
      const key = item[name];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        result.push(item);
      }
    });
    return result;
  }
}
```

```html
<div data-ng-repeat="item in vm.list | unique: 'account'"></div>
```