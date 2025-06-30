import React, { useState, useEffect } from 'react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  details?: string;
}

interface DeviceInfo {
  userAgent: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  touchSupport: boolean;
  webGL: boolean;
}

const DeviceTestSuite: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Gather device information
    const info: DeviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      touchSupport: 'ontouchstart' in window,
      webGL: !!window.WebGLRenderingContext,
    };
    setDeviceInfo(info);
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Local Storage
    try {
      localStorage.setItem('test', 'value');
      localStorage.removeItem('test');
      results.push({ name: 'Local Storage', status: 'pass' });
    } catch {
      results.push({ 
        name: 'Local Storage', 
        status: 'fail', 
        details: 'Local storage not available' 
      });
    }

    // Test 2: Touch Support
    results.push({
      name: 'Touch Support',
      status: deviceInfo?.touchSupport ? 'pass' : 'fail',
      details: deviceInfo?.touchSupport ? 'Touch events supported' : 'No touch support detected'
    });

    // Test 3: WebGL Support
    results.push({
      name: 'WebGL Support',
      status: deviceInfo?.webGL ? 'pass' : 'fail',
      details: deviceInfo?.webGL ? 'WebGL rendering available' : 'WebGL not supported'
    });

    // Test 4: Network Connection
    try {
      const response = await fetch('/api/health', { method: 'HEAD' });
      results.push({
        name: 'Network Connection',
        status: response.ok ? 'pass' : 'fail',
        details: response.ok ? 'Network connection active' : 'Network issue detected'
      });
    } catch {
      results.push({
        name: 'Network Connection',
        status: 'fail',
        details: 'Unable to reach server'
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return '✅';
      case 'fail':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'text-green-500';
      case 'fail':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Device Test Suite</h2>
      
      {deviceInfo && (
        <div className="bg-slate-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Device Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">Platform:</span>
              <span className="text-white ml-2">{deviceInfo.platform}</span>
            </div>
            <div>
              <span className="text-gray-400">Screen:</span>
              <span className="text-white ml-2">{deviceInfo.screenWidth} × {deviceInfo.screenHeight}</span>
            </div>
            <div>
              <span className="text-gray-400">Touch Support:</span>
              <span className="text-white ml-2">{deviceInfo.touchSupport ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-gray-400">WebGL:</span>
              <span className="text-white ml-2">{deviceInfo.webGL ? 'Supported' : 'Not Supported'}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Test Results</h3>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        {testResults.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {testResults.map((result, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getStatusIcon(result.status)}</span>
                  <div>
                    <div className="text-white font-medium">{result.name}</div>
                    {result.details && (
                      <div className="text-sm text-gray-400">{result.details}</div>
                    )}
                  </div>
                </div>
                <span className={`font-medium ${getStatusColor(result.status)}`}>
                  {result.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            Click &quot;Run Tests&quot; to start device testing
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceTestSuite;
