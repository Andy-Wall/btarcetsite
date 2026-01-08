import fs from 'fs';
import path from 'path';

/**
 * Data types matching the session JSON schema
 */
export interface Speaker {
  name: string;
  roleOrTitle?: string;
  organization?: string;
}

export interface SessionResource {
  label: string;
  url: string;
}

export interface Session {
  id: string;
  title: string;
  startDateTime: string;
  durationMinutes?: number;
  summary?: string;
  description?: string;
  speakers: Speaker[];
  resources?: SessionResource[];
  tags?: string[];
}

export interface PartitionedSessions {
  upcoming: Session[];
  history: Session[];
}

/**
 * Load all session JSON files from the content directory
 * @returns Array of all sessions
 */
export function loadAllSessions(): Session[] {
  const sessionsDir = path.join(process.cwd(), 'src/content/sessions');
  
  try {
    const files = fs.readdirSync(sessionsDir);
    const sessions: Session[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(sessionsDir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const session: Session = JSON.parse(content);
          sessions.push(session);
        } catch (parseError) {
          console.error(`Error parsing session file ${file}:`, parseError);
          // Continue processing other files
        }
      }
    }
    
    return sessions;
  } catch (error) {
    console.error('Error loading sessions:', error);
    return [];
  }
}

/**
 * Partition sessions into upcoming and history based on current date
 * @param sessions - Array of all sessions
 * @param referenceDate - Optional reference date for partitioning (defaults to now)
 * @returns Object with upcoming and history session arrays, both sorted
 */
export function partitionSessions(
  sessions: Session[],
  referenceDate: Date = new Date()
): PartitionedSessions {
  const upcoming: Session[] = [];
  const history: Session[] = [];
  const refTime = referenceDate.getTime();
  
  for (const session of sessions) {
    const sessionDate = new Date(session.startDateTime);
    
    // Sessions at or after the reference date are considered upcoming
    if (sessionDate.getTime() >= refTime) {
      upcoming.push(session);
    } else {
      history.push(session);
    }
  }
  
  // Sort upcoming sessions in ascending order (earliest first)
  upcoming.sort((a, b) => {
    return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
  });
  
  // Sort history sessions in descending order (most recent first)
  history.sort((a, b) => {
    return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime();
  });
  
  return { upcoming, history };
}

/**
 * Get all sessions partitioned and sorted
 * Convenience function that combines loadAllSessions and partitionSessions
 * @param referenceDate - Optional reference date for partitioning (defaults to now)
 * @returns Object with upcoming and history session arrays, both sorted
 */
export function getPartitionedSessions(
  referenceDate: Date = new Date()
): PartitionedSessions {
  const sessions = loadAllSessions();
  return partitionSessions(sessions, referenceDate);
}

/**
 * Get the next upcoming session
 * @param referenceDate - Optional reference date for comparison (defaults to now)
 * @returns The next upcoming session or null if none available
 */
export function getNextSession(referenceDate: Date = new Date()): Session | null {
  const { upcoming } = getPartitionedSessions(referenceDate);
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Get a session by ID
 * @param id - Session ID
 * @returns Session object or null if not found
 */
export function getSessionById(id: string): Session | null {
  const sessions = loadAllSessions();
  return sessions.find(session => session.id === id) || null;
}
