import React from 'react'
import { Card,Button,Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';
export default class RichText extends React.Component {

    state = {
        showRichText: false,
        editorState:''
    }

    //清空文本
    handleClearContent = () => {
        this.setState({
            editorState:''
        });
    }

    //获取html文本
    handleGetText = () => {
        this.setState({
            showRichText:true
        });
    }


    //当编辑器状态发生变化时接收状态
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    //当内容的状态发生变化时
    onEditorChange = (contentState)=>{
        this.setState({
            contentState
        });
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent} style={{marginRight:10}}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        // editorstate是编辑的状态
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    // footer不设置为null，会有确定取消按钮
                    footer={null}>
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}