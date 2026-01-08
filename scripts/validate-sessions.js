#!/usr/bin/env node

/**
 * Validate session JSON files against the JSON Schema
 * Usage: node scripts/validate-sessions.js
 */

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Paths
const SCHEMA_PATH = path.join(__dirname, '../specs/001-btarcet-site/contracts/session.schema.json');
const SESSIONS_DIR = path.join(__dirname, '../src/content/sessions');

// Initialize AJV with strict mode and formats
const ajv = new Ajv({ 
  allErrors: true,
  verbose: true,
  validateFormats: true
});
addFormats(ajv);

// Load schema
let schema;
try {
  const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
  schema = JSON.parse(schemaContent);
  // Remove $schema field to avoid meta-schema validation issues
  delete schema.$schema;
  console.log(`✓ Loaded schema from: ${SCHEMA_PATH}\n`);
} catch (error) {
  console.error(`✗ Error loading schema: ${error.message}`);
  process.exit(1);
}

// Compile schema
let validate;
try {
  validate = ajv.compile(schema);
  console.log('✓ Schema compiled successfully\n');
} catch (error) {
  console.error(`✗ Error compiling schema: ${error.message}`);
  process.exit(1);
}

// Get all session JSON files
let sessionFiles;
try {
  sessionFiles = fs.readdirSync(SESSIONS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(SESSIONS_DIR, file));
  console.log(`Found ${sessionFiles.length} session files to validate\n`);
} catch (error) {
  console.error(`✗ Error reading sessions directory: ${error.message}`);
  process.exit(1);
}

// Validate each session file
let hasErrors = false;
const results = [];

sessionFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    const valid = validate(data);
    
    if (valid) {
      console.log(`✓ ${fileName} - Valid`);
      results.push({ file: fileName, valid: true });
    } else {
      console.log(`✗ ${fileName} - Invalid`);
      console.log('  Errors:');
      validate.errors.forEach(error => {
        const field = error.instancePath || 'root';
        console.log(`    - ${field}: ${error.message}`);
        if (error.params) {
          console.log(`      ${JSON.stringify(error.params)}`);
        }
      });
      console.log('');
      results.push({ file: fileName, valid: false, errors: validate.errors });
      hasErrors = true;
    }
  } catch (error) {
    console.log(`✗ ${fileName} - Error reading/parsing file`);
    console.log(`  ${error.message}\n`);
    results.push({ file: fileName, valid: false, error: error.message });
    hasErrors = true;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('Validation Summary');
console.log('='.repeat(50));

const validCount = results.filter(r => r.valid).length;
const invalidCount = results.length - validCount;

console.log(`Total files: ${results.length}`);
console.log(`Valid: ${validCount}`);
console.log(`Invalid: ${invalidCount}`);

if (hasErrors) {
  console.log('\n✗ Validation failed');
  process.exit(1);
} else {
  console.log('\n✓ All session files are valid');
  process.exit(0);
}
