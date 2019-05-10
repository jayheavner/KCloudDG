import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage, languageCodes } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => {
  let languageInitialized = {};
  languageCodes.forEach((language) => {
    languageInitialized[language] = false;
  });

  return {
    policies: initLanguageCodeObject(),
    policy: initLanguageCodeObject(),
    languageInitialized: languageInitialized
  }
};
let { policies, policy, languageInitialized } = resetStore();

class Policy extends BaseStore {
  constructor() {
    super();
  }

  fetchPolicies(language) {
    if (languageInitialized[language]) {
      this.notifyChange(language);
      return;
    }

    let query = Client.items()
      .type('policy')
      .orderParameter('system.name');

    if (language) {
      query.languageParameter(language);
    }
    console.log(`default lang > ${defaultLanguage}`);
    console.log(`url > ${query.getUrl()}`);
    query.getObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          policies[language] = response.items;
        } else {
          policies[defaultLanguage] = response.items;
        }
        this.notifyChange();
      });
  }

  // Actions

  providePolicy(policyId, language) {
    let query = Client.items()
      .type('policy')
      .equalsFilter('system.id', policyId)

    if (language) {
      query.languageParameter(language);
    }

    query.getObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          policy[language][policyId] = response.items[0];
        } else {
          policy[defaultLanguage][policyId] = response.items[0];
        }
        this.notifyChange();
        // eslint-disable-next-line no-debugger
        debugger;
      });

  }

  providePolicies(language) {
    this.fetchPolicies(language);
  }

  // Methods

  getPolicy(policyId, language) {
    // eslint-disable-next-line no-debugger
    debugger;

    if (language) {
      return policy[language][policyId];
    } else {
      return policy[defaultLanguage][policyId];
    }
  }

  getPolicies(language) {
    return policies[language];
  }
}

let PolicyStore = new Policy();

export { PolicyStore, resetStore }