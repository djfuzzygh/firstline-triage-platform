/**
 * IVR Demo Component
 * Interactive Voice Response System Simulation
 * Shows the voice channel in action for judges
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Chip,
  Grid,
  Snackbar,
  AlertTitle,
} from '@mui/material';
import {
  Phone,
  Mic,
  PhoneDisabled,
  CheckCircle,
  Error as ErrorIcon,
  VolumeUp,
  VolumeOff,
  Stop,
  Cloud,
  CloudDone,
  CloudOff,
} from '@mui/icons-material';

interface IVRStep {
  id: string;
  prompt: string;
  options?: Array<{ key: string; label: string }>;
  onSelect?: (key: string) => void;
}

export const IVRDemo: React.FC = () => {
  const [callActive, setCallActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [triageResult, setTriageResult] = useState<any>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Database save state
  const [encounterId, setEncounterId] = useState<string | null>(null);
  const [savingEncounter, setSavingEncounter] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState<'success' | 'error' | 'info'>('info');

  // Text-to-Speech function
  const speakText = (text: string) => {
    if (!voiceEnabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean up the text (remove emoji and special formatting)
    const cleanText = text.replace(/[📞🤒⏱️⚠️🔴🟡🟢]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Save encounter to database
  const saveEncounterToDatabase = async (result: any, answers: string[]) => {
    setSavingEncounter(true);

    try {
      // Map age group to numeric age
      const ageMap: { [key: string]: number } = {
        '1': 2,    // Infant
        '2': 8,    // Child
        '3': 15,   // Teen
        '4': 35,   // Adult
        '5': 70,   // Elderly
      };

      // Map symptom to full text
      const symptomMap: { [key: string]: string } = {
        '1': 'Fever',
        '2': 'Cough',
        '3': 'Chest pain',
        '4': 'Abdominal pain',
        '5': 'Difficulty breathing',
      };

      const durationMap: { [key: string]: string } = {
        '1': 'Less than 24 hours',
        '2': '1-3 days',
        '3': '3-7 days',
        '4': 'More than 1 week',
      };

      const requestBody = {
        channel: 'voice',
        demographics: {
          age: ageMap[answers[0]] || 35,
          sex: 'M', // Default - voice doesn't collect gender
          location: 'Voice Triage',
        },
        symptoms: symptomMap[answers[1]] || 'Unknown symptoms',
        vitals: {}, // Voice doesn't collect vitals
        offlineCreated: false,
      };

      console.log('Saving encounter:', requestBody);

      const response = await fetch('/api/encounters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const id = data.encounterId || data.id || 'unknown';
      setEncounterId(id);
      setSavingEncounter(false);

      // Show success notification
      setNotificationMessage(`✅ Encounter saved to database (ID: ${id.substring(0, 8)}...)`);
      setNotificationSeverity('success');
      setNotificationOpen(true);

      console.log('Encounter saved successfully:', id);
    } catch (error) {
      console.error('Error saving encounter:', error);
      setSavingEncounter(false);

      // Show error notification
      setNotificationMessage(`⚠️ Failed to save encounter: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setNotificationSeverity('error');
      setNotificationOpen(true);
    }
  };

  // IVR Script
  const ivrScript: IVRStep[] = [
    {
      id: 'welcome',
      prompt: '📞 Welcome to FirstLine Clinical Triage. Press 1 for New Triage Assessment.',
      options: [
        { key: '1', label: 'New Triage Assessment' },
        { key: '2', label: 'Follow-up Results' },
        { key: '0', label: 'Speak with Clinician' },
      ],
    },
    {
      id: 'age_selection',
      prompt: '👤 What is the patient age group?',
      options: [
        { key: '1', label: 'Infant (0-2 years)' },
        { key: '2', label: 'Child (3-12 years)' },
        { key: '3', label: 'Teen (13-17 years)' },
        { key: '4', label: 'Adult (18-65 years)' },
        { key: '5', label: 'Elderly (65+ years)' },
      ],
    },
    {
      id: 'symptoms',
      prompt: '🤒 What are the main symptoms?',
      options: [
        { key: '1', label: 'Fever' },
        { key: '2', label: 'Cough' },
        { key: '3', label: 'Chest Pain' },
        { key: '4', label: 'Abdominal Pain' },
        { key: '5', label: 'Difficulty Breathing' },
      ],
    },
    {
      id: 'duration',
      prompt: '⏱️ How long have you had these symptoms?',
      options: [
        { key: '1', label: 'Less than 24 hours' },
        { key: '2', label: '1-3 days' },
        { key: '3', label: '3-7 days' },
        { key: '4', label: 'More than 1 week' },
      ],
    },
    {
      id: 'danger_signs',
      prompt: '⚠️ Any danger signs?',
      options: [
        { key: '1', label: 'Difficulty breathing' },
        { key: '2', label: 'Unconscious or unresponsive' },
        { key: '3', label: 'Severe bleeding' },
        { key: '4', label: 'Severe chest pain' },
        { key: '5', label: 'None of the above' },
      ],
    },
  ];

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callActive && !triageResult) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callActive, triageResult]);

  const startCall = () => {
    setCallActive(true);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setTriageResult(null);
    setCallDuration(0);

    // Speak welcome message after a brief delay
    setTimeout(() => {
      speakText(ivrScript[0].prompt);
    }, 500);
  };

  const selectOption = async (key: string) => {
    const answers = [...selectedAnswers, key];
    setSelectedAnswers(answers);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (currentStep < ivrScript.length - 1) {
      setCurrentStep(currentStep + 1);
      // Speak the next prompt
      setTimeout(() => {
        speakText(ivrScript[currentStep + 1].prompt);
      }, 300);
    } else {
      // Perform triage
      await performTriage(answers);
    }
  };

  const performTriage = async (answers: string[]) => {
    setProcessing(true);

    // Map answers to clinical data
    const ageMap: { [key: string]: string } = {
      '1': 'Infant (0-2)',
      '2': 'Child (3-12)',
      '3': 'Teen (13-17)',
      '4': 'Adult (18-65)',
      '5': 'Elderly (65+)',
    };

    const symptomMap: { [key: string]: string } = {
      '1': 'Fever (>38.5°C)',
      '2': 'Cough (persistent)',
      '3': 'Chest Pain',
      '4': 'Abdominal Pain',
      '5': 'Difficulty Breathing',
    };

    const durationMap: { [key: string]: string } = {
      '1': '< 24 hours',
      '2': '1-3 days',
      '3': '3-7 days',
      '4': '> 1 week',
    };

    const riskTier = simulateRiskAssessment(answers);

    // Generate risk-appropriate recommendations
    const getRecommendations = (tier: string, symptom: string): string[] => {
      if (tier === 'RED') {
        return [
          '🚨 EMERGENCY: Seek immediate medical care',
          'Call ambulance or go to nearest emergency room immediately',
          'Do not delay - this requires urgent evaluation',
          'Monitor airway, breathing, and circulation',
        ];
      } else if (tier === 'ORANGE') {
        return [
          '⚠️ URGENT: Seek medical care within 2-4 hours',
          'Visit nearest clinic or hospital urgently',
          'Keep patient comfortable and hydrated',
          'Monitor vital signs and symptoms closely',
          'Return immediately if symptoms worsen',
        ];
      } else if (tier === 'YELLOW') {
        return [
          '📋 IMPORTANT: Schedule clinic visit within 24 hours',
          'Rest and stay hydrated',
          'Take over-the-counter medications if appropriate',
          'Monitor symptoms - return if they worsen',
        ];
      } else {
        return [
          '✅ Self-care recommended',
          'Rest and maintain hydration',
          'Follow-up with clinician if symptoms persist beyond 7 days',
          'Seek care if symptoms worsen or new symptoms develop',
        ];
      }
    };

    // Simulate AI assessment
    const result = {
      ageGroup: ageMap[answers[0]] || 'Unknown',
      symptoms: [symptomMap[answers[1]] || 'Unknown'],
      duration: durationMap[answers[2]] || 'Unknown',
      dangerSigns: answers[4] !== '5' ? 'Yes' : 'None detected',
      riskTier,
      recommendations: getRecommendations(riskTier, symptomMap[answers[1]]),
      disclaimer:
        '⚠️ This assessment is AI-assisted clinical triage guidance, not a diagnosis. Final clinical decisions should be made by qualified healthcare providers.',
      smsMessage: `FirstLine Triage Result: ${riskTier} risk detected. ${ageMap[answers[0]]} with ${symptomMap[answers[1]].toLowerCase()} for ${durationMap[answers[2]].toLowerCase()}. Recommended action: ${riskTier === 'RED' ? 'Seek emergency care immediately' : riskTier === 'ORANGE' ? 'Urgent clinic visit within 4 hours' : riskTier === 'YELLOW' ? 'Clinic visit within 24 hours' : 'Self-care, monitor symptoms'}.`,
    };

    setTriageResult(result);
    setProcessing(false);
    setCallDuration(Math.round(callDuration));

    // Save encounter to database (fire-and-forget to not block UI)
    saveEncounterToDatabase(result, answers);

    // Speak the risk tier result after a brief delay
    setTimeout(() => {
      const resultSpeech = `Triage assessment complete. Risk tier: ${result.riskTier}. Patient is ${result.ageGroup} with ${result.symptoms.join(' and ')} for ${result.duration}. Recommended action: ${result.recommendations[0]}`;
      speakText(resultSpeech);
    }, 500);
  };

  const simulateRiskAssessment = (answers: string[]): string => {
    const ageGroup = answers[0];
    const symptom = answers[1];
    const duration = answers[2];
    const dangerSign = answers[4];

    // RED: Danger signs present
    if (dangerSign === '1' || dangerSign === '2' || dangerSign === '3' || dangerSign === '4') {
      return 'RED';
    }

    // ORANGE: Serious conditions with moderate duration
    // Difficulty breathing (high priority)
    if (symptom === '5') return 'ORANGE';
    // Chest pain (high priority)
    if (symptom === '3') return 'ORANGE';
    // Fever + prolonged duration (3+ days)
    if (symptom === '1' && (duration === '3' || duration === '4')) return 'ORANGE';
    // Abdominal pain + prolonged duration
    if (symptom === '4' && (duration === '3' || duration === '4')) return 'ORANGE';

    // YELLOW: Moderate conditions
    // Fever with short duration
    if (symptom === '1' && (duration === '1' || duration === '2')) return 'YELLOW';
    // Cough with any duration
    if (symptom === '2') return 'YELLOW';
    // Infants/elderly with any symptom (higher risk due to age)
    if ((ageGroup === '1' || ageGroup === '5') && (symptom === '1' || symptom === '2')) return 'YELLOW';

    // GREEN: Mild conditions, short duration
    return 'GREEN';
  };

  const endCall = () => {
    setCallActive(false);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setTriageResult(null);
    setCallDuration(0);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskTierColor = (tier: string): 'error' | 'warning' | 'info' | 'success' => {
    const colors: { [key: string]: 'error' | 'warning' | 'info' | 'success' } = {
      RED: 'error',
      ORANGE: 'warning',
      YELLOW: 'warning',
      GREEN: 'success',
    };
    return colors[tier] || 'info';
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            <Phone sx={{ mr: 1, verticalAlign: 'middle' }} />
            FirstLine Voice Triage Demo
          </Typography>

          {/* Call Status */}
          <Box
            sx={{
              p: 2,
              bgcolor: callActive ? '#e3f2fd' : '#f5f5f5',
              borderRadius: 1,
              mb: 2,
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {callActive && <Phone sx={{ animation: 'pulse 2s infinite' }} />}
              <Typography variant="subtitle1">
                {callActive
                  ? `Call Active - ${formatDuration(callDuration)}`
                  : triageResult
                    ? 'Call Completed'
                    : 'Call Ready'}
              </Typography>
            </Box>
          </Box>

          {/* Main IVR UI */}
          {callActive && !triageResult && (
            <Box>
              {/* Current Prompt */}
              <Box sx={{ mb: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VolumeUp color="warning" />
                    <Typography variant="body2" color="textSecondary">
                      IVR System {isSpeaking && '(Speaking...)'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {isSpeaking && (
                      <Button
                        size="small"
                        startIcon={<Stop />}
                        onClick={stopSpeaking}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                      >
                        Stop
                      </Button>
                    )}
                    {!isSpeaking && (
                      <Button
                        size="small"
                        startIcon={<VolumeUp />}
                        onClick={() => speakText(ivrScript[currentStep].prompt)}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                      >
                        Repeat
                      </Button>
                    )}
                    <Button
                      size="small"
                      startIcon={voiceEnabled ? <VolumeUp /> : <VolumeOff />}
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      variant="text"
                      color={voiceEnabled ? 'primary' : 'inherit'}
                    />
                  </Box>
                </Box>
                <Typography variant="h6">{ivrScript[currentStep].prompt}</Typography>
              </Box>

              {/* Options */}
              {ivrScript[currentStep].options && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {ivrScript[currentStep].options!.map((option) => (
                    <Grid item xs={12} key={option.key}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => selectOption(option.key)}
                        disabled={processing}
                        sx={{
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          p: 1.5,
                        }}
                      >
                        <Typography sx={{ mr: 1, fontWeight: 'bold' }}>Press {option.key}</Typography>
                        {option.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Progress */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Question {currentStep + 1} of {ivrScript.length}
                </Typography>
                <LinearProgress variant="determinate" value={((currentStep + 1) / ivrScript.length) * 100} />
              </Box>
            </Box>
          )}

          {/* Processing State */}
          {processing && (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <LinearProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Analyzing triage data...
              </Typography>
            </Box>
          )}

          {/* Results */}
          {triageResult && (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                ✅ Triage Assessment Complete
              </Alert>

              {/* Risk Tier */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Risk Assessment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={triageResult.riskTier}
                    color={getRiskTierColor(triageResult.riskTier)}
                    variant="filled"
                    size="medium"
                    sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                  />
                  <Typography variant="body2">{triageResult.ageGroup} patient</Typography>
                </Box>
              </Box>

              {/* Patient Summary */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Clinical Assessment
                </Typography>
                <Typography variant="body2">
                  <strong>Age Group:</strong> {triageResult.ageGroup}
                </Typography>
                <Typography variant="body2">
                  <strong>Symptoms:</strong> {triageResult.symptoms.join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {triageResult.duration}
                </Typography>
                <Typography variant="body2">
                  <strong>Danger Signs:</strong> {triageResult.dangerSigns}
                </Typography>
              </Box>

              {/* Recommendations - Color coded by risk */}
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 1,
                  bgcolor:
                    triageResult.riskTier === 'RED'
                      ? '#ffebee'
                      : triageResult.riskTier === 'ORANGE'
                        ? '#fff3e0'
                        : triageResult.riskTier === 'YELLOW'
                          ? '#fffde7'
                          : '#e8f5e9',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Recommended Actions
                  </Typography>
                  <Button
                    size="small"
                    startIcon={isSpeaking ? <Stop /> : <VolumeUp />}
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking();
                      } else {
                        speakText(triageResult.recommendations.join('. '));
                      }
                    }}
                    variant="text"
                  >
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </Button>
                </Box>
                {triageResult.recommendations.map((rec: string, idx: number) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 0.5, pl: 1 }}>
                    {rec}
                  </Typography>
                ))}
              </Box>

              {/* SMS Notification - Show actual SMS content */}
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  📱 SMS Notification Sent:
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', p: 1, bgcolor: '#fff' }}>
                  {triageResult.smsMessage}
                </Typography>
              </Alert>

              {/* Disclaimer */}
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                ⚠️ {triageResult.disclaimer}
              </Typography>

              {/* Call Stats */}
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mb: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Call Duration: {formatDuration(callDuration)}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!callActive && !triageResult && (
              <Button variant="contained" color="success" fullWidth startIcon={<Phone />} onClick={startCall}>
                Start Call
              </Button>
            )}

            {(callActive || triageResult) && (
              <>
                {callActive && !triageResult && (
                  <Button variant="outlined" color="error" fullWidth startIcon={<PhoneDisabled />} onClick={endCall}>
                    End Call
                  </Button>
                )}
                {triageResult && (
                  <Button variant="contained" fullWidth onClick={() => endCall()}>
                    Start New Call
                  </Button>
                )}
              </>
            )}
          </Box>

          {/* Demo Info */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="caption">
              This is a simulated IVR demo. In production, this integrates with Africa's Talking toll-free numbers
              and performs real triage via MedGemma AI. SMS notifications are sent automatically.
            </Typography>
          </Alert>

          {/* Encounter Save Status */}
          {triageResult && encounterId && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CloudDone sx={{ color: '#4CAF50' }} />
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Encounter Saved
                </Typography>
                <Typography variant="caption" display="block">
                  ID: {encounterId.substring(0, 8)}...
                </Typography>
              </Box>
            </Box>
          )}

          {/* Saving State */}
          {savingEncounter && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Cloud sx={{ color: '#2196F3', animation: 'pulse 2s infinite' }} />
              <Typography variant="caption" color="textSecondary">
                Saving to database...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Notification Snackbar */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default IVRDemo;
