
const memberDetail = {
  mentor: ['熊猫匡'],
  teamLeader: ['壹铭'],
  members: ['道道', '岛民阿强', '冯辰', '萨摩儿', '修文7w0']
}

export const About = () => {
  return (
    <>
      {Object.keys(memberDetail).map((key, index) => {
        return (
          <div key={`${key}${index}`}>
            <div className="title">{key}</div>
            {memberDetail[key].map((name) => <div key={name}>{name}</div>)}
          </div>

        )
      })}
    </>
  )
}
