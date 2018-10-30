import React from 'react';
import { Input, Select, Form, Button, Checkbox, DatePicker, Radio } from 'antd';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {

    handleFilterSubmit = ()=> {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        // 用getFieldDecorator来实现文本框的two-way binding功能
        const { getFieldDecorator } = this.props.form;//用this.props.form取得form的对象
        //获取从外层传进来的formlist
        const formList = this.props.formList;
        const formItemList = [];
        //遍历和解析formlist
        if (formList && formList.length > 0) {
            formList.forEach((item,i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '城市') {
                    
                    const city = <FormItem label="城市" key={field}>
                        {
                            getFieldDecorator('city',{
                                initialValue:'0'
                            })(
                                <Select
                                    style={{width:80}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '3', name: '天津' }, { id: '4', name: '杭州' }])}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(city)
                } else if (item.type == '时间查询') {
                    const begin_time = <FormItem key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time)
                    //colon=false可以去除冒号
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time)
                } else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {/* field用[]表示当成一个变量形式来对待他 */}
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            }) (
                                <Input type="text" style={{ width: width }} placeholder={placeholder}/>
                            )
                        }   
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {/* field用[]表示当成一个变量形式来对待他 */}
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            }) (
                                <Select style={{width: width}} placeholder={placeholder}>
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }   
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                    {/* field用[]表示当成一个变量形式来对待他 */}
                    {
                        getFieldDecorator([field], {
                            //checkbox必须有valuePropName这个属性,有checked才能表示被选中
                            valuePropName: 'checked',
                            initialValue: initialValue//true or false
                        }) (
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }   
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (item.type == 'DATE') {
                    const Date = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(Date)
                }
            })
        }
        return formItemList;//得到以上所有的code组成的数组，返回值
    }

    render() {
        return (
            <Form layout="inline">
                {/* 不确定表单会生成什么元素，所以需要动态地生成表单 */}
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>Search</Button>
                    <Button onClick={this.reset}>Reset</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({}) (FilterForm);
