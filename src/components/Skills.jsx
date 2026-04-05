import React from 'react'

function Skills() {
  const skills = [
    { name: 'HTML/CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React JS', level: 75 },
    { name: 'Laravel', level: 70 }
  ]

  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: 'white'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      fontSize: '36px',
      marginBottom: '40px',
      color: '#2c3e50'
    },
    skillItem: {
      marginBottom: '20px'
    },
    skillName: {
      marginBottom: '5px',
      color: '#555',
      fontWeight: 'bold'
    },
    skillBar: {
      backgroundColor: '#ecf0f1',
      height: '30px',
      borderRadius: '5px',
      overflow: 'hidden'
    },
    skillProgress: {
      backgroundColor: '#3498db',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      color: 'white',
      fontSize: '14px'
    }
  }

  return (
    <section id="skills" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Keahlian</h2>
        {skills.map((skill, index) => (
          <div key={index} style={styles.skillItem}>
            <div style={styles.skillName}>{skill.name}</div>
            <div style={styles.skillBar}>
              <div style={{...styles.skillProgress, width: `${skill.level}%`}}>
                {skill.level}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills