// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/Toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Node Library</h2>
                <p className="toolbar-subtitle">Drag nodes onto the canvas to build your pipeline</p>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' iconColor='#22c55e' />
                <DraggableNode type='llm' label='LLM' icon='🤖' iconColor='#3b82f6' />
                <DraggableNode type='customOutput' label='Output' icon='📤' iconColor='#ef4444' />
                <DraggableNode type='text' label='Text' icon='📝' iconColor='#a855f7' />
                <DraggableNode type='conditional' label='Conditional' icon='🔀' iconColor='#f59e0b' />
                <DraggableNode type='math' label='Math' icon='🔢' iconColor='#06b6d4' />
                <DraggableNode type='filter' label='Filter' icon='🔍' iconColor='#ec4899' />
                <DraggableNode type='transform' label='Transform' icon='🔄' iconColor='#14b8a6' />
                <DraggableNode type='merge' label='Merge' icon='🔗' iconColor='#6366f1' />
            </div>
        </div>
    );
};