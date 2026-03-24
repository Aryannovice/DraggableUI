import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const extractVariables = (text = '') => {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1].trim());
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text ?? '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const variables = useMemo(() => extractVariables(text), [text]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    const maxHeight = 320;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [text]);

  const handles = useMemo(
    () => [
      ...variables.map((variable, index) => ({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: {
          top:
            variables.length === 1
              ? '50%'
              : `${((index + 1) * 100) / (variables.length + 1)}%`,
        },
      })),
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ],
    [variables, id]
  );

  return (
    <BaseNode id={id} data={data} title="Text" nodeType="text" handles={handles}>
      <div style={{ width: '100%' }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Text:</div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              updateNodeField(id, 'text', e.target.value);
            }}
            placeholder="Enter text... Use {{variableName}} for variables"
            style={{
              width: '100%',
              minHeight: 60,
              padding: '10px 14px',
              border: '2px solid #e2e8f0',
              borderRadius: 10,
              fontSize: 14,
              fontFamily: 'inherit',
              lineHeight: 1.5,
              resize: 'none',
              overflow: 'hidden',
              background: 'linear-gradient(135deg,#fff,#f8fafc)',
              color: '#0f172a',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          />
        </label>

        {variables.length > 0 && (
          <div
            style={{
              marginTop: 12,
              padding: '8px 12px',
              background: 'rgba(139,92,246,0.08)',
              borderRadius: 8,
              fontSize: 12,
              color: '#6b21a8',
            }}
          >
            <strong>Variables detected:</strong> {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
};