using System.IO;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using BlazorApp.Shared.Models;

namespace Api
{
    public class SendEmailFunction
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public SendEmailFunction(ILoggerFactory loggerFactory, IConfiguration configuration)
        {
            _logger = loggerFactory.CreateLogger<SendEmailFunction>();
            _configuration = configuration;
        }

        [Function("SendEmailFunction")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
        {
            _logger.LogInformation("SendEmailFunction triggered.");

            // Read configuration values
            //var smtpServer = _configuration["SMTP_Server"];
            //var smtpPort = int.Parse(_configuration["SMTP_Port"]);
            //var smtpUser = _configuration["SMTP_User"];
            //var smtpPass = _configuration["SMTP_Pass"];
            var smtpServer = Environment.GetEnvironmentVariable("SMTP_Server");
            var smtpPort = int.Parse(Environment.GetEnvironmentVariable("SMTP_Port"));
            var smtpUser = Environment.GetEnvironmentVariable("SMTP_User");
            var smtpPass = Environment.GetEnvironmentVariable("SMTP_Pass");

            // Deserialize the request body
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonSerializer.Deserialize<ContactFormModel>(requestBody, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            var name = data?.Name;

            // Ensure required fields are not null or empty
            if (string.IsNullOrEmpty(name))
            {
                var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Please provide a name.");
                return badRequestResponse;
            }

            // Create email message
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Contact Form", smtpUser));
            emailMessage.To.Add(new MailboxAddress("Recipient", "tortuganolapools@gmail.com"));
            emailMessage.Subject = "Contact Form Submission";
            emailMessage.Body = new TextPart("plain")
            {
                Text = $"Name: {name}"
            };

            try
            {
                using (var smtpClient = new SmtpClient())
                {
                    await smtpClient.ConnectAsync(smtpServer, smtpPort, true);
                    await smtpClient.AuthenticateAsync(smtpUser, smtpPass);
                    await smtpClient.SendAsync(emailMessage);
                    await smtpClient.DisconnectAsync(true);
                }

                // Success response
                var successResponse = req.CreateResponse(HttpStatusCode.OK);
                await successResponse.WriteStringAsync("Email sent successfully.");
                return successResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send email: {ex.Message}");

                // Failure response
                var failureResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                await failureResponse.WriteStringAsync("Failed to send email.");
                return failureResponse;
            }
        }
    }
}
