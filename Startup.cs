using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using WOF.Entities;
using WOF.Services;
using Microsoft.EntityFrameworkCore;
using NLog.Extensions.Logging;
using WOF.Models;

namespace WOF
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            var connectionString = this.Configuration["connectionStrings:WOFDBConnectionString"];
            services.AddDbContext<WOFContext>(o => o.UseSqlServer(connectionString));

            services.AddScoped<IPrizeRepository, PrizeRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, WOFContext wofContext)
        {
            // add NLog
            //loggerFactory.AddProvider(new NLog.Extensions.Logging.NLogLoggerProvider);
            loggerFactory.ConfigureNLog("nlog.config");
            loggerFactory.AddNLog();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
				app.UseWebpackDevMiddleware(new Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions
				{
					HotModuleReplacement = true
				});
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            // Auto Create Seed Data if no data created yet
            wofContext.EnsureSeedDataForContext();

            app.UseStatusCodePages();

            // Give access to static file like css, js, etc
            app.UseStaticFiles();

            // Init Mapping for Converting Entity to Model(Dto) 
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Prize, PrizeDto>();
				cfg.CreateMap<Prize, PrizeForUpdateDto>();
				cfg.CreateMap<Prize, PrizeForCreateDto>();
				cfg.CreateMap<PrizeForUpdateDto, Prize>();
				cfg.CreateMap<PrizeForCreateDto, Prize>();
			});

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
