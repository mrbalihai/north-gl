vec3 calcDirectionalLight(DirectionalLight light, Material material, vec3 normal, vec3 viewDir)
{
    vec3 lightDir = normalize(-light.direction);

    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);

    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);

    // combine results
    vec3 ambient = light.ambient * material.diffuse * material.color;
    vec3 diffuse = light.diffuse * diff * material.diffuse * material.color;
    vec3 specular = light.specular * spec * material.specular * material.color;
    return (ambient + diffuse + specular);
}

