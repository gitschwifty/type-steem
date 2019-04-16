/**
 * @file Utility functions.
 * @author Peter James Taggart <staggarts@gmail.com>
 */

const minOneKeys = ['limit', 'blockNum', 'bucketSeconds'];

/**
 *
 * @param params parameters to test
 * @param max pass if there is a max to limit
 */
export function CheckParams(
  params: { [key: string]: string | number | string[] },
  max: number = 10000
) {
  for (const key in params) {
    if (Array.isArray(params[key])) {
      checkStringArrParam(params[key] as string[], key);
    } else if (typeof params[key] === 'string') {
      checkStringParam(params[key] as string, key);
    } else {
      checkNumberParam(params[key] as number, key, max);
    }
  }
}

function checkStringArrParam(param: string[], key: string) {
  if (!param[0]) {
    throw new Error(
      'Must pass at least one non-empty string in array ' + key + '.'
    );
  }
}

function checkStringParam(param: string, key: string) {
  if (!param) {
    throw new Error('String parameter ' + key + ' cannot be empty.');
  }
}

function checkNumberParam(param: number, key: string, max: number) {
  if (minOneKeys.includes(key) && param < 1) {
    throw new Error('Parameter ' + key + ' must be >= 1.');
  } else if (param < 0) {
    throw new Error('Parameter ' + key + ' must be >= 0.');
  } else if (max < param && key === 'limit') {
    throw new Error('Parameter ' + key + ' must be <= ' + max + '.');
  }
}
