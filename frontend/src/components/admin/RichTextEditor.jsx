"use client";
import React, {  useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
// dynamic(() => import("jodit-react"), { ssr: false })

const RichTextEditor = ({ placeholder,value,changeHandler }) => {
	const editor = useRef(null);

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

	return (
		<JoditEditor
			ref={editor}
			value={value}
			config={config}
			tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
			onChange={(newData)=>
			{
changeHandler(newData);
			}
			}
		/>
	);
};
export default RichTextEditor;