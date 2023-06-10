import "core-js/modules/es.array.map.js";
import { substitute } from "./../../helpers/string.mjs"; /**
                                                          * Try to substitute variable inside phrase propositions.
                                                          *
                                                          * @param {Array} phrasePropositions List of phrases propositions.
                                                          * @param {object} zippedVariablesAndValues Object containing variables and corresponding values.
                                                          *
                                                          * @returns {string} Phrases with substituted variables if it's possible, list of unchanged phrase propositions otherwise.
                                                          */
export default function substituteVariables(phrasePropositions, zippedVariablesAndValues) {
  if (Array.isArray(phrasePropositions)) {
    return phrasePropositions.map(function (phraseProposition) {
      return substituteVariables(phraseProposition, zippedVariablesAndValues);
    });
  }
  return substitute(phrasePropositions, zippedVariablesAndValues);
}