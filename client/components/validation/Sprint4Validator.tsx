/**
 * Sprint4Validator - Component for validating Sprint 4 features
 * Focus: Mobile-First Optimization and testing
 */

import React, { useState, useEffect } from 'react';
import { useDeviceTesting } from '../../hooks/useDeviceTesting';

interface ValidationResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  score?: number;
}

interface Sprint4ValidatorProps {
  showDetails?: boolean;
  autoRun?: boolean;
  className?: string;
}

const Sprint4Validator: React.FC<Sprint4ValidatorProps> = ({
  showDetails = false,
  autoRun = true,
  className = ''
}) => {
  const {
    deviceInfo,
    testResults,
    isTestingEnabled,
    runFullTestSuite,
    setIsTestingEnabled
  } = useDeviceTesting();

  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'pass' | 'fail' | 'warning'>('pass');

  const runValidation = async () => {
    setIsRunning(true);
    setIsTestingEnabled(true);

    try {
      const results = await runFullTestSuite();
      const validations: ValidationResult[] = [];

      // Device Detection Validation
      validations.push({
        test: 'Device Detection',
        status: deviceInfo.type !== 'unknown' ? 'pass' : 'fail',
        message: `Device detected as ${deviceInfo.type} on ${deviceInfo.os}`,
        score: deviceInfo.type !== 'unknown' ? 100 : 0
      });

      // Responsive Design Validation
      if (results?.responsive) {
        validations.push({
          test: 'Responsive Design',
          status: results.responsive.score >= 80 ? 'pass' : results.responsive.score >= 60 ? 'warning' : 'fail',
          message: `${(results.responsive as any).responsiveElements || 0} responsive elements found`,
          score: results.responsive.score
        });
      }

      // Touch Support Validation
      if (results?.touch) {
        validations.push({
          test: 'Touch Support',
          status: results.touch.score >= 80 ? 'pass' : results.touch.score >= 60 ? 'warning' : 'fail',
          message: (results.touch as any).hasTouch ? 
            `Touch enabled with ${(results.touch as any).maxTouchPoints || 0} touch points` : 
            'Touch not supported',
          score: results.touch.score
        });
      }

      // Performance Validation
      if (results?.performance) {
        validations.push({
          test: 'Performance',
          status: results.performance.score >= 80 ? 'pass' : results.performance.score >= 60 ? 'warning' : 'fail',
          message: `Render time: ${(results.performance as any).renderTime || 0}ms`,
          score: results.performance.score
        });
      }

      // Accessibility Validation
      if (results?.accessibility) {
        validations.push({
          test: 'Accessibility',
          status: results.accessibility.score >= 80 ? 'pass' : results.accessibility.score >= 60 ? 'warning' : 'fail',
          message: `A11y score: ${results.accessibility.score}%`,
          score: results.accessibility.score
        });
      }

      // Feature Compatibility Validation
      if (results?.features) {
        validations.push({
          test: 'Feature Compatibility',
          status: results.features.score >= 80 ? 'pass' : results.features.score >= 60 ? 'warning' : 'fail',
          message: `${(results.features as any).support?.supported || 0}/${(results.features as any).support?.total || 0} features supported`,
          score: results.features.score
        });
      }

      setValidationResults(validations);

      // Calculate overall status
      const failCount = validations.filter(v => v.status === 'fail').length;
      const warningCount = validations.filter(v => v.status === 'warning').length;
      
      if (failCount > 0) {
        setOverallStatus('fail');
      } else if (warningCount > 0) {
        setOverallStatus('warning');
      } else {
        setOverallStatus('pass');
      }

    } catch (error) {
      console.error('Validation error:', error);
      setValidationResults([{
        test: 'Validation Suite',
        status: 'fail',
        message: 'Failed to run validation tests',
        score: 0
      }]);
      setOverallStatus('fail');
    }

    setIsRunning(false);
  };

  useEffect(() => {
    if (autoRun && isTestingEnabled) {
      runValidation();
    }
  }, [autoRun, isTestingEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'fail': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return '❓';
    }
  };

  if (!showDetails && overallStatus === 'pass') {
    return null;
  }

  return (
    <div className={`sprint4-validator p-4 border rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Sprint 4 Validation {getStatusIcon(overallStatus)}
        </h3>
        <button
          onClick={runValidation}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Tests'}
        </button>
      </div>

      <div className={`mb-2 font-medium ${getStatusColor(overallStatus)}`}>
        Overall Status: {overallStatus.toUpperCase()}
      </div>

      {showDetails && validationResults.length > 0 && (
        <div className="space-y-2">
          {validationResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <span>{getStatusIcon(result.status)}</span>
                <span className="font-medium">{result.test}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm ${getStatusColor(result.status)}`}>
                  {result.message}
                </div>
                {result.score !== undefined && (
                  <div className="text-xs text-gray-500">
                    Score: {result.score}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <details>
            <summary className="cursor-pointer">Debug Info</summary>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify({ deviceInfo, testResults }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Sprint4Validator;
