export const Dialogue = ({ dialogues, bgImg, choices, postChoice }) =>{
  return (
    <>
      <div className='container' >
        <div className='dialogue-box' >
          <div className='dialogue' dangerouslySetInnerHTML={{ __html: dialogues }}></div>
          <div className='setting'/>
        </div>
        <img className='bg' src={bgImg} />
      </div>
      {choices ? (
        <div className='choices-modal'>
          {choices.map((choice) => <div className='choice' key={choice.id} onClick={() => postChoice(choice.id)}>{choice.text}</div>)}
        </div>
      ) : null}
    </>
  )
}
