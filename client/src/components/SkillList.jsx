import React from 'react';
import { Card } from 'antd';

const SkillList = ({ skills }) => {

  const getSkillCards = () => {
    return skills.map((skill, ind) => {
      return (
        <Card key={'skill-item-' + ind} title={skill.name} bordered={true} style={{ width: 280, margin: '10px', display: 'inline-block', verticalAlign: 'top' }}>
          <p><b>{skill.type}</b></p>
          <p>{skill.description}</p>
        </Card>
      );
    });
  }

  return (
    <div>
      {getSkillCards()}
    </div>
  );
}

export default SkillList;
