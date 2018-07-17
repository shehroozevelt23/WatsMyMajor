import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { hasTakenCourse } from '../../utils/courses';

const styles = {
  iconStyle: {
    left: 0,
  },
  labelStyle: (taken) => ({
    width: '100%',
    color: (taken) ? '#107f0c' : 'inherit'
  }),
  checkbox: {
    marginTop: 10,
    width: 'auto',
    marginLeft: 20,
    textAlign: 'left',
  }
};

export default class CourseCheck extends Component {
  static propTypes = {
    subject: PropTypes.string.isRequired,
    catalogNumber: PropTypes.string.isRequired,
    myCourses: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
  };

  state = {
    taken: false,
    isChecked: false
  };

  componentDidMount() {
    const { subject, catalogNumber, myCourses } = this.props;
    this.checkTaken(subject, catalogNumber, myCourses);
  }

  componentWillReceiveProps(nextProps) {
    const { subject, catalogNumber, myCourses } = nextProps;
    if (subject !== this.props.subject || catalogNumber !== this.props.catalogNumber) {
      this.checkTaken(subject, catalogNumber, myCourses);
    }
  }

  checkTaken = (subject, catalogNumber, myCourses) => {
    const taken = hasTakenCourse(subject, catalogNumber, myCourses);
    // If course is taken, increment count by 1
    if (taken) this.props.onCheck(null, true);
    this.setState({ taken, isChecked: taken });
  }

  onCheck = (ev, isChecked) => {
    this.setState({ isChecked });
    this.props.onCheck(ev, isChecked);
  }

  render() {
    const { subject, catalogNumber, myCourses } = this.props;
    return (
      <Checkbox
        label={ `${subject} ${catalogNumber}` }
        checked={ this.state.isChecked }
        disabled={ this.state.taken }
        onCheck={ this.onCheck }
        labelStyle={ styles.labelStyle(this.state.taken) }
        iconStyle={ styles.iconStyle }
        style={ styles.checkbox }
      />
    );
  }
}