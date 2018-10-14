import React from 'react';
import { Card, Form, Checkbox, Button, Input, Icon, Radio, Switch, TimePicker, Select, message, InputNumber, DatePicker, Upload } from 'antd';
import '../ui/ui.less';
import moment from 'moment';
const FormItem = Form.Item; 
const RadioGroup = Radio.Group;
const Option = Select.Option;
const timeFormat = 'HH:mm:ss';
const dateFormat = 'YYYY/MM/DD';
const TextArea = Input.TextArea;
// const imageUrl = this.state.imageUrl;



class Register extends React.Component {
    state = {
        
    }
    //获取图片的base64格式
    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //getFieldValue可以轻松获取表单的所有值，获取一组输入控件的值，如不传入参数，则获取全部组件的值
        let userInfo = this.props.form.getFieldsValue();
        //validateFields校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // es6模板语法`${}`
                console.log(JSON.stringify(userInfo));
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                //在xs时，指定为24（整列）,在sm时，指定只占4
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                //sm只要和上面相加起来不超过24就行，而xs那行，因为sm指定为4时，是一行，所以加起来不需要超过24，而直接指定24时，就变成两行了
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    //向右偏移4列
                    offset: 4
                }
            }
        }
        return (
            <div>
                <Card title="注册页面">
                    <Form layout='horizontal'>
                        {/* //labelCol和wrapperCol可以设置左边标签和右边输入框等的占页面的比例 */}
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct username!'
                                        },
                                        {
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        },
                                        {
                                            //regExp可以规定多个正则表达式
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                }) (
                                    //prefix是前缀
                                    <Input prefix={<Icon type='user'/>} placeholder="please enter username"/>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('passWord', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct password!'
                                        }
                                    ]
                                }) (
                                    //prefix是前缀
                                    <Input type="password" prefix={<Icon type='lock'/>} placeholder="please enter password"/>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                }) (
                                    //prefix是前缀
                                    <RadioGroup>
                                        <Radio value='1'>male</Radio>
                                        <Radio value='2'>female</Radio>
                                    </RadioGroup>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 17
                                }) (
                                    <InputNumber></InputNumber>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue:'4',
                                }) (
                                    <Select>
                                        <Option value='1'>咸鱼</Option>
                                        <Option value='2'>肝</Option>
                                        <Option value='3'>肝秃了</Option>
                                        <Option value='4'>面试过了</Option>
                                    </Select>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue:['4', '1']
                                }) (
                                    <Select mode="multiple">
                                        <Option value='1'>写代码</Option>
                                        <Option value='2'>玩</Option>
                                        <Option value='3'>跑步</Option>
                                        <Option value='4'>听音乐</Option>
                                        <Option value='5'>唱歌</Option>
                                    </Select>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarrige', {
                                    initialValue: false
                                }) (
                                    <Switch></Switch>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birth', {
                                    initialValue:moment('2015/01/01')
                                }) (
                                    <DatePicker showTime format={dateFormat} />
                                )
                            }                  
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue:'princeton'
                                }) (
                                    <TextArea autosize={
                                        {
                                            minRows: 4,
                                            maxRows: 6
                                        }
                                    }/>
                                )
                            }                  
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time') (
                                    <TimePicker showTime format={timeFormat} />
                                )
                            }                  
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg') (
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        //action地址要换成自己服务端接口的地址
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                    {/* //如果有值，显示img，如果没值，显示plus号 */}
                                    {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('remember', {
                                    // 子节点的值的属性，如 Switch 的是 'checked',这里，下面checkbox里的√就会默认打上
                                    valuePropName: 'checked',
                                    //如果initialValue写成false，就会默认不打上√
                                    initialValue: true
                                }) (
                                    <Checkbox>我已经阅读<a href="#" defaultChecked>协议</a></Checkbox>
                                )
                            }    
                                          
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('button') (
                                    <Button type="primary" onClick={this.handleSubmit}>Register</Button>
                                )
                            }                  
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create() (Register);