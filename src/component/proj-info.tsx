import React from "react";

export default function ProjectInfo(props) {
  let { groupID } = props
  return (
    <>
    {groupID ? <p className="text-center">To download your document as images please copy document ID <b className="group-id">{groupID}</b>. 
        We are saving your recent ID in your browser until you don't click reset button.
      </p>: ''}
      <p className="text-center">Click on Download button and enter your document ID to download the docs. Please remember, for large file rendering will take time.</p>
    </>
  )
}
