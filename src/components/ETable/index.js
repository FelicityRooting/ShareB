import React from "react";
import { Table } from 'antd';


export default class ETable extends React.Component{

    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        if (rowSelection == 'checkbox') {
            //多选
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                //判断有无重复
                const i = selectedIds.indexOf(record.id);
                //如果i==-1，那么当前已点击的是另外一个，说明选了个新的，如果不是，点击的则是自己,这一次选的和上一次选的一样
                if(i == -1) {
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    //取消选中,splice会影响原生array，slice不会影响原生array
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedItem = record;
                selectedRowKeys = [index];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            //单选
            let selectedRowKeys = [index];
            let selectedItem = record;
            //调用父级方法updateSelectedItem，传入record和index数据
            this.props.updateSelectedItem(selectedRowKeys, selectedItem);
        }

        
    }

    tableInit = () => {
        //接收外界传入的数据
        // this.props;
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        //如果row_selection是false，则是没有传rowSelection，不需要单选或者复选
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection == 'checkbox') {
            //此为多选项
            rowSelection.type = 'checkbox'
        } else {
            //此为单选项
            row_selection = 'radio'
        }
        return <Table 
                bordered 
                //对传入的数据进行结构
                {...this.props}
                //每个菜单传进来的列(不固定)
                rowSelection={row_selection ? rowSelection:null}
                //点击某一行发生的事
                onRow = {(record, index) => {
                    return {
                        onClick: () => {
                            //如果没有单选和复选，则直接return，不走onRowClick方法
                            if (!row_selection){
                                return;
                            }
                            this.onRowClick(record, index);
                        }
                    };
                }}
            />
    }
    


    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}