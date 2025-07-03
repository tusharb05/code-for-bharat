// Utility functions for roadmap processing

function parseHours(str) {
  // e.g., '6 Hours' => 6
  const match = str.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 6;
}

function getWeeklySchedule(roadmap) {
  const weeks = [];
  const weeklyHours = parseHours(roadmap.weeklyCommitment || '6 Hours');
  // First, collect all modules and milestones by week
  const weekMap = {};
  roadmap.timeline.forEach(item => {
    if (!weekMap[item.week]) weekMap[item.week] = { tasks: [], milestones: [] };
    if (item.type === 'module') {
      weekMap[item.week].tasks = item.tasks.map(task => ({ ...task, week: item.week }));
    } else if (item.type === 'milestone') {
      weekMap[item.week].milestones.push(item);
    }
  });

  // Now, flatten into an array of weeks, sorted by week number
  const weekNumbers = Object.keys(weekMap).map(Number).sort((a, b) => a - b);
  weekNumbers.forEach(weekNum => {
    weeks.push({
      week: weekNum,
      tasks: weekMap[weekNum].tasks || [],
      milestones: weekMap[weekNum].milestones || [],
    });
  });

  return weeks;
}

function getCoursesProgress(roadmap, completedTasks) {
  // Find all unique courses
  const allTasks = roadmap.timeline
    .filter(i => i.type === 'module')
    .flatMap(m => m.tasks);
  const courses = allTasks.filter(t => t.type === 'course');
  const uniqueCourses = [];
  const seen = new Set();
  courses.forEach(course => {
    if (!seen.has(course.title)) {
      uniqueCourses.push(course);
      seen.add(course.title);
    }
  });

  // For each course, calculate total duration (in hours)
  function parseTaskHours(task) {
    const match = task.time.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 1;
  }

  const weeklyHours = parseHours(roadmap.weeklyCommitment || '6 Hours');

  return uniqueCourses.map(course => {
    const totalHours = parseTaskHours(course);
    const weeksNeeded = Math.ceil(totalHours / weeklyHours);
    // Count how many hours completed for this course
    const completed = completedTasks.filter(
      t => t.type === 'course' && t.title === course.title && t.completed
    ).length;
    // Each week counts as 1/total weeks
    return {
      ...course,
      totalHours,
      weeksNeeded,
      progress: `${completed}/${weeksNeeded}`,
      percent: Math.round((completed / weeksNeeded) * 100),
    };
  });
}

function getRoadmapProgress(roadmap, completedTasks, completedMilestones) {
  // Progress = (completed tasks + completed milestones) / (total tasks + total milestones)
  const allTasks = roadmap.timeline
    .filter(i => i.type === 'module')
    .flatMap(m => m.tasks);
  const totalTasks = allTasks.length;
  const totalMilestones = roadmap.timeline.filter(i => i.type === 'milestone').length;
  const completedTaskCount = completedTasks.length;
  const completedMilestoneCount = completedMilestones.length;
  const total = totalTasks + totalMilestones;
  const completed = completedTaskCount + completedMilestoneCount;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

module.exports = {
  getWeeklySchedule,
  getCoursesProgress,
  getRoadmapProgress,
}; 