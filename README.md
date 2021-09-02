# punchClock
### 打卡服务

接口地址： http://aginx.cn:39011/clock
请求方式： GET
请求参数：

|标识|	类型|	字段含义|	备注|
|----|----|----|----|
|appId|	String|	appId	| |
|number|	String|	手机号||
|timeStamp|	String|	时间戳|	|
|sign|	String|	签名||
响应参数：

| 标识   | 类型   | 字段含义 | 备注                                                         |
| ------ | ------ | -------- | ------------------------------------------------------------ |
| result | Int    | 应答码   | 0：成功 -1：缺少参数 -2：签名错误 -3请求失败 -4 链接失效 -5 参数错误 |
| msg    | String | 应答信息 | 对应result                                                   |

签名算法：
签名生成规则如下：参与签名的字段包括appId（随机字符串）,number,timestamp对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。对string1作hmac_sha1加密.
即sign=HMAC_SHA1(string1, appSecrt)

示例：

string1= 'appId=123&number=19966298180&timeStamp=1629363393341'

appScert = 456

sign = 226DAA33898CEBCCEAF1EB9038BEC44EAC77