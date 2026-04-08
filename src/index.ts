#!/usr/bin/env bun
import { Command } from "commander";
import { globalFlags, ENVIRONMENTS } from "./lib/config.js";
import { authCommand } from "./commands/auth.js";

// V1 — Core AI
import { conversationsResource } from "./resources/conversations.js";
import { messagesResource } from "./resources/messages.js";
import { agentsResource } from "./resources/agents.js";
import { agentTodosResource } from "./resources/agent-todos.js";
import { agentSecretsResource } from "./resources/agent-secrets.js";
import { teamsResource } from "./resources/teams.js";
import { workspaceResource } from "./resources/workspace.js";
import { skillsResource } from "./resources/skills.js";
import { memoriesResource } from "./resources/memories.js";
import { modelsResource } from "./resources/models.js";
import { presetsResource } from "./resources/presets.js";
import { filesResource } from "./resources/files.js";
import { settingsResource } from "./resources/settings.js";
import { apiKeysResource } from "./resources/api-keys.js";
import { hierarchyResource } from "./resources/hierarchy.js";
import { workStatesResource } from "./resources/work-states.js";

// V2 — CRM & Commerce
import { crmCompaniesResource } from "./resources/crm-companies.js";
import { crmContactsResource } from "./resources/crm-contacts.js";
import { crmDealsResource } from "./resources/crm-deals.js";
import { crmSubscriptionsResource } from "./resources/crm-subscriptions.js";
import { crmInvoicesResource } from "./resources/crm-invoices.js";
import { crmActivitiesResource } from "./resources/crm-activities.js";
import { crmTasksResource } from "./resources/crm-tasks.js";
import { crmReportingResource } from "./resources/crm-reporting.js";
import { crmExportResource } from "./resources/crm-export.js";
import { crmHealthResource } from "./resources/crm-health.js";
import { crmMrrResource } from "./resources/crm-mrr.js";
import { crmPipelineResource } from "./resources/crm-pipeline.js";
import { crmSearchResource } from "./resources/crm-search.js";
import { crmZammadResource } from "./resources/crm-zammad.js";
import { creditNotesResource } from "./resources/credit-notes.js";
import { productsResource } from "./resources/products.js";
import { ordersResource } from "./resources/orders.js";
import { quotesResource } from "./resources/quotes.js";
import { promoCodesResource } from "./resources/promo-codes.js";
import { incomingInvoicesResource } from "./resources/incoming-invoices.js";
import { checkoutResource } from "./resources/checkout.js";
import { subscriptionsResource } from "./resources/subscriptions.js";

// V3 — Admin & Infrastructure
import { adminResource } from "./resources/admin.js";
import { entitiesResource } from "./resources/entities.js";
import { monitoringResource } from "./resources/monitoring.js";
import { mcpServersResource } from "./resources/mcp-servers.js";
import { jobsResource } from "./resources/jobs.js";
import { repositoriesResource } from "./resources/repositories.js";
import { agentBrowserResource } from "./resources/agent-browser.js";
import { agentChatResource } from "./resources/agent-chat.js";
import { agentMemoriesResource } from "./resources/agent-memories.js";
import { agentAutoRoutingResource } from "./resources/agent-auto-routing.js";
import { agentMonitoringResource } from "./resources/agent-monitoring.js";
import { agentSchedulesResource } from "./resources/agent-schedules.js";
import { agentWebhooksResource } from "./resources/agent-webhooks.js";
import { analyticsResource } from "./resources/analytics.js";
import { analyticsGa4Resource } from "./resources/analytics-ga4.js";
import { analyticsPagespeedResource } from "./resources/analytics-pagespeed.js";
import { analyticsSearchConsoleResource } from "./resources/analytics-search-console.js";
import { complianceResource } from "./resources/compliance.js";
import { notificationsResource } from "./resources/notifications.js";
import { systemPromptResource } from "./resources/system-prompt.js";
import { pmResource } from "./resources/pm.js";
import { domainsResource } from "./resources/domains.js";
import { usersResource } from "./resources/users.js";
import { archiveResource } from "./resources/archive.js";
import { conversationsCrossResource } from "./resources/conversations-cross.js";
import { hallucinationsResource } from "./resources/hallucinations.js";
import { emailTemplatesResource } from "./resources/email-templates.js";

// V4 — Compliance, Client & Public
import { clientAuthResource } from "./resources/client-auth.js";
import { clientAuthExtendedResource } from "./resources/client-auth-extended.js";
import { clientPanelResource } from "./resources/client-panel.js";
import { clientProjectsResource } from "./resources/client-projects.js";
import { abuseResource } from "./resources/abuse.js";
import { accountingResource } from "./resources/accounting.js";
import { erasureResource } from "./resources/erasure.js";
import { ereportingResource } from "./resources/ereporting.js";
import { rgpdExportResource } from "./resources/rgpd-export.js";
import { twoFactorResource } from "./resources/two-factor.js";
import { publicCatalogResource } from "./resources/public-catalog.js";
import { publicContactResource } from "./resources/public-contact.js";
import { publicQuotesResource } from "./resources/public-quotes.js";
import { pushNotificationsResource } from "./resources/push-notifications.js";
import {
  webhooksResource,
  i18nResource,
  onboardingResource,
  referralsResource,
  helpCenterResource,
  dunningResource,
  cancellationsResource,
  legalPagesResource,
  userCredentialsResource,
  brainstormResource,
  claudeAccountsResource,
  pluginsResource,
  eventsResource,
  imagesResource,
} from "./resources/misc.js";

const program = new Command();

program
  .name("serenity-ai-cli")
  .description("CLI for the Serenity AI platform — manage conversations, agents, teams, workspaces, CRM, commerce, compliance and more")
  .version("2.0.0")
  .option("--env <env>", `Environment: ${Object.keys(ENVIRONMENTS).join(", ")}`, "")
  .option("--json", "Output as JSON", false)
  .option("--format <fmt>", "Output format: text, json, csv, yaml", "text")
  .option("--verbose", "Enable debug logging", false)
  .option("--no-color", "Disable colored output")
  .option("--no-header", "Omit table/csv headers (for piping)")
  .hook("preAction", (_thisCmd, actionCmd) => {
    const root = actionCmd.optsWithGlobals();
    globalFlags.env = root.env ?? "";
    globalFlags.json = root.json ?? false;
    globalFlags.format = root.format ?? "text";
    globalFlags.verbose = root.verbose ?? false;
    globalFlags.noColor = root.color === false;
    globalFlags.noHeader = root.header === false;
  });

// Built-in commands
program.addCommand(authCommand);

// V1 — Core AI
program.addCommand(conversationsResource);
program.addCommand(messagesResource);
program.addCommand(agentsResource);
program.addCommand(agentTodosResource);
program.addCommand(agentSecretsResource);
program.addCommand(teamsResource);
program.addCommand(workspaceResource);
program.addCommand(skillsResource);
program.addCommand(memoriesResource);
program.addCommand(modelsResource);
program.addCommand(presetsResource);
program.addCommand(filesResource);
program.addCommand(settingsResource);
program.addCommand(apiKeysResource);
program.addCommand(hierarchyResource);
program.addCommand(workStatesResource);

// V2 — CRM & Commerce
program.addCommand(crmCompaniesResource);
program.addCommand(crmContactsResource);
program.addCommand(crmDealsResource);
program.addCommand(crmSubscriptionsResource);
program.addCommand(crmInvoicesResource);
program.addCommand(crmActivitiesResource);
program.addCommand(crmTasksResource);
program.addCommand(crmReportingResource);
program.addCommand(crmExportResource);
program.addCommand(crmHealthResource);
program.addCommand(crmMrrResource);
program.addCommand(crmPipelineResource);
program.addCommand(crmSearchResource);
program.addCommand(crmZammadResource);
program.addCommand(creditNotesResource);
program.addCommand(productsResource);
program.addCommand(ordersResource);
program.addCommand(quotesResource);
program.addCommand(promoCodesResource);
program.addCommand(incomingInvoicesResource);
program.addCommand(checkoutResource);
program.addCommand(subscriptionsResource);

// V3 — Admin & Infrastructure
program.addCommand(adminResource);
program.addCommand(entitiesResource);
program.addCommand(monitoringResource);
program.addCommand(mcpServersResource);
program.addCommand(jobsResource);
program.addCommand(repositoriesResource);
program.addCommand(agentBrowserResource);
program.addCommand(agentChatResource);
program.addCommand(agentMemoriesResource);
program.addCommand(agentAutoRoutingResource);
program.addCommand(agentMonitoringResource);
program.addCommand(agentSchedulesResource);
program.addCommand(agentWebhooksResource);
program.addCommand(analyticsResource);
program.addCommand(analyticsGa4Resource);
program.addCommand(analyticsPagespeedResource);
program.addCommand(analyticsSearchConsoleResource);
program.addCommand(complianceResource);
program.addCommand(notificationsResource);
program.addCommand(systemPromptResource);
program.addCommand(pmResource);
program.addCommand(domainsResource);
program.addCommand(usersResource);
program.addCommand(archiveResource);
program.addCommand(conversationsCrossResource);
program.addCommand(hallucinationsResource);
program.addCommand(emailTemplatesResource);

// V4 — Compliance, Client & Public
program.addCommand(clientAuthResource);
program.addCommand(clientAuthExtendedResource);
program.addCommand(clientPanelResource);
program.addCommand(clientProjectsResource);
program.addCommand(abuseResource);
program.addCommand(accountingResource);
program.addCommand(erasureResource);
program.addCommand(ereportingResource);
program.addCommand(rgpdExportResource);
program.addCommand(twoFactorResource);
program.addCommand(publicCatalogResource);
program.addCommand(publicContactResource);
program.addCommand(publicQuotesResource);
program.addCommand(pushNotificationsResource);
program.addCommand(webhooksResource);
program.addCommand(i18nResource);
program.addCommand(onboardingResource);
program.addCommand(referralsResource);
program.addCommand(helpCenterResource);
program.addCommand(dunningResource);
program.addCommand(cancellationsResource);
program.addCommand(legalPagesResource);
program.addCommand(userCredentialsResource);
program.addCommand(brainstormResource);
program.addCommand(claudeAccountsResource);
program.addCommand(pluginsResource);
program.addCommand(eventsResource);
program.addCommand(imagesResource);

program.parse();
