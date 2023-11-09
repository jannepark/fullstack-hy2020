import { ContentProps } from '../types';

const Part = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div>
                <h4 style={{ marginBottom: 0 }}>
                  {part.name} {part.exerciseCount}
                </h4>
                <em>{part.description}</em>
              </div>
            );
          case 'group':
            return (
              <div>
                <h4 style={{ marginBottom: 0 }}>
                  {part.name} {part.exerciseCount}
                </h4>
                <div>Project exercises {part.groupProjectCount}</div>
              </div>
            );
          case 'background':
            return (
              <div>
                <h4 style={{ marginBottom: 0 }}>
                  {part.name} {part.exerciseCount}
                </h4>
                <em>{part.description}</em>
                <div>Submit to {part.backgroundMaterial}</div>
              </div>
            );
          case 'special':
            return (
              <div>
                <h4 style={{ marginBottom: 0 }}>
                  {part.name} {part.exerciseCount}
                </h4>
                <em>{part.description}</em>
                <div>
                  Required skills:
                  {part.requirements.map((r) => {
                    return ' ' + r + ', ';
                  })}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Part;
