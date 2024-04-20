# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# copy csproj files and restore
COPY *.sln .
COPY API/*.csproj ./API/
COPY Core/*.csproj ./Core/
COPY Data/*.csproj ./Data/
COPY Entities/*.csproj ./Entities/ 
RUN dotnet restore 
# copy and build app and libraries
COPY API/. ./API/
COPY Core/. ./Core/
COPY Data/. ./Data/ 
COPY Entities/. ./Entities/

WORKDIR /src/API
RUN dotnet build "API.csproj" -c Release -o /app/build
# publish 
FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
# copy json files for seeding the db
COPY --from=build /src/Data/SeedData/*.json ./Data/SeedData/
# copy everything from /app/publish to current /app folder
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]
