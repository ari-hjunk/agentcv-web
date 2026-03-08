export type Profile = {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  website_url: string | null;
  twitter_url: string | null;
  consulting_available: boolean;
  consulting_rate: string | null;
  created_at: string;
  updated_at: string;
};

export type Agent = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  avatar: string | null;
  category: string;
  categories: string[];
  stack: string[];
  industry: string | null;
  about: string | null;
  verified: boolean;
  verification_level: string;
  operational_since: string | null;
  review_count: number;
  endorsement_count: number;
  owner_id: string | null;
  owner_display: string | null;
  owner_title: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type AgentCapability = {
  id: string;
  agent_id: string;
  capability_name: string;
  level: number;
  created_at: string;
};

export type AgentMetric = {
  id: string;
  agent_id: string;
  uptime_days: number | null;
  uptime_pct: number | null;
  tasks_completed: number | null;
  success_rate: number | null;
  avg_response_time_ms: number | null;
  revenue_generated: number | null;
  github_commits: number | null;
  last_updated: string;
};

export type AgentActivity = {
  id: string;
  agent_id: string;
  date: string;
  description: string;
  type: string;
  created_at: string;
};

export type AgentBlueprint = {
  id: string;
  agent_id: string;
  title: string;
  description: string | null;
  type: string | null;
  external_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ConsultingRequest = {
  id: string;
  requester_email: string;
  requester_name: string;
  agent_id: string;
  message: string;
  status: string;
  created_at: string;
};

export type Endorsement = {
  id: string;
  from_agent_id: string;
  to_agent_id: string;
  message: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          username: string;
          display_name: string;
          bio?: string | null;
          avatar_url?: string | null;
          website_url?: string | null;
          twitter_url?: string | null;
          consulting_available?: boolean;
          consulting_rate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          website_url?: string | null;
          twitter_url?: string | null;
          consulting_available?: boolean;
          consulting_rate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agents: {
        Row: Agent;
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          avatar?: string | null;
          category: string;
          categories?: string[];
          stack?: string[];
          industry?: string | null;
          about?: string | null;
          verified?: boolean;
          verification_level?: string;
          operational_since?: string | null;
          review_count?: number;
          endorsement_count?: number;
          owner_id?: string | null;
          owner_display?: string | null;
          owner_title?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string | null;
          avatar?: string | null;
          category?: string;
          categories?: string[];
          stack?: string[];
          industry?: string | null;
          about?: string | null;
          verified?: boolean;
          verification_level?: string;
          operational_since?: string | null;
          review_count?: number;
          endorsement_count?: number;
          owner_id?: string | null;
          owner_display?: string | null;
          owner_title?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      agent_capabilities: {
        Row: AgentCapability;
        Insert: {
          id?: string;
          agent_id: string;
          capability_name: string;
          level: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          capability_name?: string;
          level?: number;
          created_at?: string;
        };
      };
      agent_metrics: {
        Row: AgentMetric;
        Insert: {
          id?: string;
          agent_id: string;
          uptime_days?: number | null;
          uptime_pct?: number | null;
          tasks_completed?: number | null;
          success_rate?: number | null;
          avg_response_time_ms?: number | null;
          revenue_generated?: number | null;
          github_commits?: number | null;
          last_updated?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          uptime_days?: number | null;
          uptime_pct?: number | null;
          tasks_completed?: number | null;
          success_rate?: number | null;
          avg_response_time_ms?: number | null;
          revenue_generated?: number | null;
          github_commits?: number | null;
          last_updated?: string;
        };
      };
      agent_activity: {
        Row: AgentActivity;
        Insert: {
          id?: string;
          agent_id: string;
          date: string;
          description: string;
          type?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          date?: string;
          description?: string;
          type?: string;
          created_at?: string;
        };
      };
      agent_blueprints: {
        Row: AgentBlueprint;
        Insert: {
          id?: string;
          agent_id: string;
          title: string;
          description?: string | null;
          type?: string | null;
          external_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          title?: string;
          description?: string | null;
          type?: string | null;
          external_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      consulting_requests: {
        Row: ConsultingRequest;
        Insert: {
          id?: string;
          requester_email: string;
          requester_name: string;
          agent_id: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          requester_email?: string;
          requester_name?: string;
          agent_id?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      endorsements: {
        Row: Endorsement;
        Insert: {
          id?: string;
          from_agent_id: string;
          to_agent_id: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_agent_id?: string;
          to_agent_id?: string;
          message?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
