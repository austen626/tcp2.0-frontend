import React from 'react';
export const AddIcon = (props) => {
    return (
        <>
            <svg className="cursor-pointer" onClick={props.clickEvent} xmlns="http://www.w3.org/2000/svg" width="24.406" height="24.406" viewBox="0 0 24.406 24.406">
                <path fill="#97b0c6" d="M21.791 2.25H2.615A2.616 2.616 0 0 0 0 4.865v19.176a2.616 2.616 0 0 0 2.615 2.615h19.176a2.616 2.616 0 0 0 2.615-2.615V4.865a2.616 2.616 0 0 0-2.615-2.615zm-1.743 13.728a.656.656 0 0 1-.654.654h-5.012v5.012a.656.656 0 0 1-.654.654h-3.05a.656.656 0 0 1-.654-.654v-5.012H5.012a.656.656 0 0 1-.654-.654v-3.05a.656.656 0 0 1 .654-.654h5.012V7.262a.656.656 0 0 1 .654-.654h3.051a.656.656 0 0 1 .654.654v5.012h5.012a.656.656 0 0 1 .654.654z" transform="translate(0 -2.25)"/>
            </svg>
        </>
    )
};

export const GrayTrashIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21.572" height="24.653" viewBox="0 0 21.572 24.653">
            <path fill="#acc7d6" d="M1.541 22.342a2.311 2.311 0 0 0 2.311 2.311H17.72a2.311 2.311 0 0 0 2.311-2.311V6.163H1.541zm13.1-12.327a.77.77 0 1 1 1.541 0V20.8a.77.77 0 0 1-1.541 0zm-4.623 0a.77.77 0 1 1 1.541 0V20.8a.77.77 0 0 1-1.541 0zm-4.623 0a.77.77 0 1 1 1.541 0V20.8a.77.77 0 0 1-1.541 0zM20.8 1.541h-5.777l-.453-.9A1.156 1.156 0 0 0 13.535 0h-5.5A1.142 1.142 0 0 0 7 .64l-.453.9H.77a.77.77 0 0 0-.77.77v1.542a.77.77 0 0 0 .77.77H20.8a.77.77 0 0 0 .77-.77V2.311a.77.77 0 0 0-.77-.77z"/>
        </svg>

    )
}
