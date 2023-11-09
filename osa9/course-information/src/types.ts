export interface HeaderProps {
  courseName: string;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
  totalExercises: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartWithDescription {
  //   description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartWithDescription {
  //   description: string;
  backgroundMaterial: string;
  kind: 'background';
}
interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
