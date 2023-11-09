import { ContentProps } from '../types';
import Part from './Part';

const Content = (props: ContentProps) => {
  return (
    <div>
      <Part courseParts={props.courseParts} />
    </div>
  );
};
export default Content;
