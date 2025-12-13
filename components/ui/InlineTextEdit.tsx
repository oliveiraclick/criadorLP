"use client";

import React, { useState, useEffect, useRef } from 'react';

type InlineEditProps = {
    value: string;
    onChange: (newValue: string) => void;
    isEditing: boolean;
    className?: string;
    tagName?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    multiline?: boolean;
};

export default function InlineTextEdit({
    value,
    onChange,
    isEditing,
    className = "",
    tagName = 'span',
    multiline = false
}: InlineEditProps) {
    const [isActive, setIsActive] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActive]);

    const handleBlur = () => {
        setIsActive(false);
        onChange(tempValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
    };

    if (isEditing && isActive) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleBlur}
                    className={`bg-white/90 backdrop-blur border-2 border-blue-500 rounded p-1 outline-none w-full min-h-[100px] resize-y text-slate-900 shadow-xl z-50 relative ${className}`}
                    style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`bg-white/90 backdrop-blur border-2 border-blue-500 rounded p-1 outline-none w-full text-slate-900 shadow-xl z-50 relative ${className}`}
                style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}
            />
        );
    }

    const Tag = tagName as any;

    return (
        <Tag
            onClick={() => isEditing && setIsActive(true)}
            className={`${className} ${isEditing ? 'cursor-text hover:bg-blue-500/10 hover:outline-dashed hover:outline-2 hover:outline-blue-500/50 rounded transition-all box-decoration-clone' : ''}`}
        >
            {value}
        </Tag>
    );
}
