'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    ))
    : people.filter(person => person.sex === 'm');

  const eachAge = men.map(person => person.died - person.born);
  const averageAge = eachAge.reduce((a, b) => a + b) / eachAge.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(child => child.mother === person.name)
    ))
    : people.filter(person => person.sex === 'f');

  const eachAge = women.map(person => person.died - person.born);
  const averageAge = eachAge.reduce((a, b) => a + b) / eachAge.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => (
      person.sex === 'm' && people.some(woman => woman.name === person.mother)
    ))
    : people.filter(person => (
      people.some(woman => woman.name === person.mother)
    ));

  const ageDif = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const average = ageDif.reduce((a, b) => a + b) / ageDif.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
