using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class YCameraRotation : MonoBehaviour {

    Transform cameraTransform;

    void Start()
    {
        cameraTransform = GameObject.FindGameObjectWithTag("MainCamera").GetComponent<Transform>();
    }

    void Update()
    {
        transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, cameraTransform.rotation.eulerAngles.y, transform.rotation.eulerAngles.z);
    }
}
