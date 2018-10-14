import React from 'react';
import { Card, Form, Button, Input, message, Icon, Checkbox } from 'antd';
import '../ui/ui.less';
//formitem是form通过form.item拿到item对象
const FormItem = Form.Item; 

//声明一个普通的class
class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        //getFieldValue可以轻松获取表单的所有值，获取一组输入控件的值，如不传入参数，则获取全部组件的值
        let userInfo = this.props.form.getFieldsValue();
        //validateFields校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // es6模板语法`${}`
                message.success(`${userInfo.userName}, 面试通过了，工资是${userInfo.passWord}元`);
            }
        })
    }

    render() {
        //this.props.form是antd自动封装的，可以获取表单里的数据
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单" type='card' className='card-wrap'>
                    <Form layout='inline'>
                    <FormItem>
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
                        <FormItem>
                            {
                                getFieldDecorator('passWord', {
                                    initialValue:'',
                                    rules: [{required: true, message: 'Please enter correct password!'}]
                                }) (
                                    <Input prefix={<Icon type='lock'/>} type="password" placeholder="please enter password"/> 
                                )
                            }                  
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>                    
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" type='card' className='card-wrap'>
                    <Form layout='horizontal' style={{width: 300}}>
                        <FormItem>
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
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                }) (
                                    <Input prefix={<Icon type='user'/>} placeholder="please enter username"/>
                                )
                            }                  
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord', {
                                    initialValue:'',
                                    rules: [{required: true, message: 'Please enter correct password!'}]
                                }) (
                                    <Input prefix={<Icon type='lock'/>} type="password" placeholder="please enter password"/> 
                                )
                            }                  
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    // 子节点的值的属性，如 Switch 的是 'checked',这里，下面checkbox里的√就会默认打上
                                    valuePropName: 'checked',
                                    //如果initialValue写成false，就会默认不打上√
                                    initialValue: true
                                }) (
                                    <Checkbox>remember password</Checkbox>
                                )
                            }    
                            <a href="#" defaultChecked>忘记密码</a>              
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>                    
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
//一定要通过form.create来创建一个新表单，把旧表单穿进去，才能通过this.props.form取到，下面这里通过export来export出去
export default Form.create() (Login);